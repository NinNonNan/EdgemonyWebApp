/*
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

 (function(window) {
   
    if (!!window.cookieChoices) {
      return window.cookieChoices;
    }
  
    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var supportsTextContent = 'textContent' in document.body;
  
    var cookieChoices = (function() {
  
      var cookieName = 'displayCookieConsent';
      var cookieConsentId = 'cookieChoiceInfo';
      var dismissLinkId = 'cookieChoiceDismiss';
  
  function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
      var butterBarStyles = 'position:fixed;width:100%;background-color:#eee;' +
          'margin:0;left:0;bottom:0;padding:4px;z-index:1000;';
  
      cookieText = 'Utilizziamo i cookie per migliorare la tua esperienza di navigazione, analizzare il traffico, pubblicare annunci e personalizzare i contenuti. Fare clic su "Acconsento" per acconsentire all\'utilizzo dei cookie o su "Gestisci i cookie" per modificare le impostazioni predefinite dei cookie.';
  
      var cookieConsentElement = document.createElement('div');
      cookieConsentElement.id = cookieConsentId;
      cookieConsentElement.style.cssText = butterBarStyles;
  
      var title = document.createElement('h4');
      title.classList.add('card-title');
      title.innerHTML = '<i class="fa-solid fa-cookie-bite fa-xl text-greenVZ"></i> Gestione Cookies';
      cookieConsentElement.appendChild(title);
  
      var paragraph = document.createElement('p');
      paragraph.classList.add('card-text');
      paragraph.innerHTML = cookieText;
      cookieConsentElement.appendChild(paragraph);
  
      var divContainer = document.createElement('div');
      divContainer.classList.add('d-flex', 'flex-row', 'align-items-center');
  
      var anchorElement = document.createElement('a');
      anchorElement.href = _createInformationLink(linkText, linkHref);
      anchorElement.title = 'Informativa sulla privacy';
      anchorElement.classList.add('m-2', 'ms-md-0');
      anchorElement.innerHTML = '<strong>Informativa Privacy <i class="fa-solid fa-up-right-from-square"></i></strong>';
      divContainer.appendChild(anchorElement);
  
      var buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.classList.add('btn', 'btn-outline-dark', 'btn-rounded', 'btn-sm', 'm-2');
      buttonElement.setAttribute('data-mdb-ripple-init', true);
      buttonElement.setAttribute('data-mdb-ripple-color', 'dark');
      buttonElement.setAttribute('data-mdb-target', '#GestisciCookie');
      buttonElement.innerHTML = 'Gestisci i cookie';
      divContainer.appendChild(buttonElement);
  
      cookieConsentElement.appendChild(divContainer);
  
      cookieConsentElement.appendChild(document.createElement('hr'));
  
      // Aggiunta dei pulsanti "Acconsento" e "Rifiuto"
      var buttonConsent = document.createElement('button');
      buttonConsent.type = 'button';
      buttonConsent.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-sm', 'm-2');
      buttonConsent.setAttribute('data-mdb-ripple-init', true);
      buttonConsent.innerHTML = 'Acconsento';
  
      var buttonReject = document.createElement('button');
      buttonReject.type = 'button';
      buttonReject.classList.add('btn', 'btn-primary', 'btn-rounded', 'btn-sm', 'm-2');
      buttonReject.setAttribute('data-mdb-ripple-init', true);
      buttonReject.innerHTML = 'Rifiuto';
  
      cookieConsentElement.appendChild(buttonReject);
      cookieConsentElement.appendChild(buttonConsent);
  
      var checkboxContainer = document.createElement('div');
      checkboxContainer.id = 'GestisciCookie';
      checkboxContainer.innerHTML = '<h5>Impostazioni Cookie:</h5>';
      checkboxContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  
      var checkboxLabels = ['Necessari', 'Statistici', 'Marketing'];
      for (var i = 0; i < checkboxLabels.length; i++) {
          var checkboxDiv = document.createElement('div');
          checkboxDiv.classList.add('form-check', 'form-check-inline');
  
          var checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';
          checkboxInput.classList.add('form-check-input');
          checkboxInput.id = 'inlineCheckbox' + (i + 1);
          checkboxInput.value = 'option' + (i + 1);
          checkboxDiv.appendChild(checkboxInput);
  
          var checkboxLabel = document.createElement('label');
          checkboxLabel.classList.add('form-check-label');
          checkboxLabel.setAttribute('for', 'inlineCheckbox' + (i + 1));
          checkboxLabel.innerHTML = checkboxLabels[i];
          checkboxDiv.appendChild(checkboxLabel);
  
          checkboxContainer.appendChild(checkboxDiv);
      }
  
      cookieConsentElement.appendChild(checkboxContainer);
  
      return cookieConsentElement;
  }
  
  
      function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
        var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
            'top:0;left:0;opacity:0.5;filter:alpha(opacity=50);' +
            'background-color:#ccc;';
        var dialogStyle = 'z-index:1000;position:fixed;left:50%;top:50%';
        var contentStyle = 'position:relative;left:-50%;margin-top:-25%;' +
            'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';
  
        var cookieConsentElement = document.createElement('div');
        cookieConsentElement.id = cookieConsentId;
  
        var glassPanel = document.createElement('div');
        glassPanel.style.cssText = glassStyle;
  
        var content = document.createElement('div');
        content.style.cssText = contentStyle;
  
        var dialog = document.createElement('div');
        dialog.style.cssText = dialogStyle;
  
        var dismissLink = _createDismissLink(dismissText);
        dismissLink.style.display = 'block';
        dismissLink.style.textAlign = 'right';
        dismissLink.style.marginTop = '8px';
  
        content.appendChild(_createConsentText(cookieText));
        if (!!linkText && !!linkHref) {
          content.appendChild(_createInformationLink(linkText, linkHref));
        }
        content.appendChild(dismissLink);
        dialog.appendChild(content);
        cookieConsentElement.appendChild(glassPanel);
        cookieConsentElement.appendChild(dialog);
        return cookieConsentElement;
      }
  
      function _setElementText(element, text) {
        if (supportsTextContent) {
          element.textContent = text;
        } else {
          element.innerText = text;
        }
      }
  
      function _createConsentText(cookieText) {
        var consentText = document.createElement('span');
        _setElementText(consentText, cookieText);
        return consentText;
      }
  
      function _createDismissLink(dismissText) {
        var dismissLink = document.createElement('a');
        _setElementText(dismissLink, dismissText);
        dismissLink.id = dismissLinkId;
        dismissLink.href = '#';
        dismissLink.style.marginLeft = '24px';
        return dismissLink;
      }
  
      function _createInformationLink(linkText, linkHref) {
        var infoLink = document.createElement('a');
        _setElementText(infoLink, linkText);
        infoLink.href = linkHref;
        infoLink.target = '_blank';
        infoLink.style.marginLeft = '8px';
        return infoLink;
      }
  
      function _dismissLinkClick() {
          _saveUserPreference();
          _removeCookieConsent();
        return false;
      }
  
      function _showCookieConsent(cookieText, dismissText, linkText, linkHref, isDialog) {
        if (_shouldDisplayConsent()) {
          _removeCookieConsent();
          var consentElement = (isDialog) ?
              _createDialogElement(cookieText, dismissText, linkText, linkHref) :
              _createHeaderElement(cookieText, dismissText, linkText, linkHref);
          var fragment = document.createDocumentFragment();
          fragment.appendChild(consentElement);
          document.body.appendChild(fragment.cloneNode(true));
          document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
        }
      }
  
      function showCookieConsentBar(cookieText, dismissText, linkText, linkHref) {
        _showCookieConsent(cookieText, dismissText, linkText, linkHref, false);
      }
  
      function showCookieConsentDialog(cookieText, dismissText, linkText, linkHref) {
        _showCookieConsent(cookieText, dismissText, linkText, linkHref, true);
      }
  
      function _removeCookieConsent() {
        var cookieChoiceElement = document.getElementById(cookieConsentId);
        if (cookieChoiceElement != null) {
          cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
        }
      }
  
      function _saveUserPreference() {
        // Set the cookie expiry to one year after today.
        var expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        document.cookie = cookieName + '=y; expires=' + expiryDate.toGMTString();
      }
  
      function _shouldDisplayConsent() {
        // Display the header only if the cookie has not been set.
        return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
      }
  
      var exports = {};
      exports.showCookieConsentBar = showCookieConsentBar;
      exports.showCookieConsentDialog = showCookieConsentDialog;
      return exports;
    })();
  
    window.cookieChoices = cookieChoices;
    return cookieChoices;
  })(this);
  