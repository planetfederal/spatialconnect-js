/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  DeviceEventEmitter,
  NativeAppEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';

export const initialize = () => {
  if (window.WebViewJavascriptBridge) {
    return;
  }
  let messagingIframe;
  let sendMessageQueue = [];
  let receiveMessageQueue = [];
  const messageHandlers = {};

  const CUSTOM_PROTOCOL_SCHEME = 'wvjbscheme';
  const QUEUE_HAS_MESSAGE = '__WVJB_QUEUE_MESSAGE__';
  const IFRAME_SRC = `${CUSTOM_PROTOCOL_SCHEME}://${QUEUE_HAS_MESSAGE}`;

  const responseCallbacks = {};
  let uniqueId = 1;

  function _createQueueReadyIframe(doc) {
    messagingIframe = doc.createElement('iframe');
    messagingIframe.style.display = 'none';
    messagingIframe.src = IFRAME_SRC;
    doc.documentElement.appendChild(messagingIframe);
  }

  function init(messageHandler) {
    if (WebViewJavascriptBridge._messageHandler) {
      throw new Error('WebViewJavascriptBridge.init called twice');
    }
    WebViewJavascriptBridge._messageHandler = messageHandler;
    const receivedMessages = receiveMessageQueue;
    receiveMessageQueue = null;
    for (let i = 0; i < receivedMessages.length; i++) {
      _dispatchMessageFromObjC(receivedMessages[i]);
    }
  }

  function send(data, responseCallback) {
    _doSend({ data }, responseCallback);
  }

  function registerHandler(handlerName, handler) {
    if (navigator.product.match(/ReactNative/)) {
      if (Platform.OS === 'ios') {
        NativeAppEventEmitter.addListener(handlerName.toString(), handler);
      } else if (Platform.OS === 'android') {
        DeviceEventEmitter.addListener(handlerName.toString(), handler);
      }
    } else {
      messageHandlers[handlerName] = handler;
    }
  }

  function callHandler(handlerName, data, responseCallback) {
    _doSend({ handlerName, data }, responseCallback);
  }

  function _doSend(message, responseCallback) {
    const m = message;
    if (responseCallback) {
      const callbackId = `cb_${(uniqueId += 1)}_${new Date().getTime()}`;
      responseCallbacks[callbackId] = responseCallback;
      m.callbackId = callbackId;
    }
    if (navigator.product.match(/ReactNative/)) {
      NativeModules.SCBridge.handler(m.data);
    } else if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
      sendMessageQueue.push(message);
      messagingIframe.src = IFRAME_SRC;
    } else if (navigator.userAgent.match(/Android/)) {
      const data = typeof m.data === 'object' ? JSON.stringify(m.data) : (m.data || null);
      _WebViewJavascriptBridge._handleMessageFromJs(data,
        m.responseId || null,
        m.responseData || null,
        m.callbackId || null,
        m.handlerName || null);
    }
  }

  function _fetchQueue() {
    const messageQueueString = JSON.stringify(sendMessageQueue);
    sendMessageQueue = [];
    return messageQueueString;
  }

  function _dispatchMessageFromObjC(messageJSON) {
    setTimeout(() => {
      const message = JSON.parse(messageJSON);
      let responseCallback;

      if (message.responseId) {
        responseCallback = responseCallbacks[message.responseId];
        if (!responseCallback) {
          return;
        }
        responseCallback(message.responseData);
        delete responseCallbacks[message.responseId];
      } else {
        if (message.callbackId) {
          const callbackResponseId = message.callbackId;
          responseCallback = (responseData) => {
            _doSend({
              responseId: callbackResponseId,
              responseData,
            });
          };
        }

        let handler = WebViewJavascriptBridge._messageHandler;
        if (message.handlerName) {
          handler = messageHandlers[message.handlerName];
        }

        try {
          handler(message.data, responseCallback);
        } catch (exception) {
          if (typeof console !== 'undefined') {
            console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.',
            message, exception);
          }
        }
      }
    });
  }

  function _handleMessageFromObjC(messageJSON) {
    if (receiveMessageQueue) {
      receiveMessageQueue.push(messageJSON);
    } else {
      _dispatchMessageFromObjC(messageJSON);
    }
  }

  function _dispatchMessageFromJava(messageJSON) {
    const message = JSON.parse(messageJSON);
    let responseCallback;
    if (message.responseId) {
      responseCallback = responseCallbacks[message.responseId];
      if (!responseCallback) {
        return;
      }
      responseCallback(message.responseData);
      delete responseCallbacks[message.responseId];
    } else {
      if (message.callbackId) {
        const callbackResponseId = message.callbackId;
        responseCallback = (responseData) => {
          _doSend({
            responseId: callbackResponseId,
            responseData,
          });
        };
      }

      let handler = WebViewJavascriptBridge._messageHandler;
      if (message.handlerName) {
        handler = messageHandlers[message.handlerName];
      }
      try {
        handler(message.data, responseCallback);
      } catch (exception) {
        if (typeof console !== 'undefined') {
          console.log('WebViewJavascriptBridge: WARNING: javascript handler threw.',
          message, exception);
        }
      }
    }
  }

  function _handleMessageFromJava(messageJSON) {
    console.log('recieved message from java: ', messageJSON);
    _dispatchMessageFromJava(messageJSON);
  }

  window.WebViewJavascriptBridge = {
    init,
    send,
    registerHandler,
    callHandler,
    _fetchQueue,
    _handleMessageFromObjC,
    _handleMessageFromJava,
  };

  if (!navigator.product.match(/ReactNative/)) {
    const doc = document;
    _createQueueReadyIframe(doc);
    const readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('WebViewJavascriptBridgeReady');
    readyEvent.bridge = WebViewJavascriptBridge;
    doc.dispatchEvent(readyEvent);
  }
};

