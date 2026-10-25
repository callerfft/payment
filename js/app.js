/**
 * Payment Hub — Application Logic
 * Detects protocol, handles QR modals, toasts and clipboard sharing.
 */

(function () {
  'use strict';

  // DOM Elements
  const elements = {
    fileNotice: document.getElementById('fileProtocolNotice'),
    shareLinkBtn: document.getElementById('shareLinkBtn'),
    toastContainer: document.getElementById('toastContainer'),
    qrModal: document.getElementById('qrModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    qrTriggers: document.querySelectorAll('[data-qr-trigger]'),
  };

  // Toast Notification
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2200);
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Copy to Clipboard
  function copyToClipboard(text, successMsg = 'Скопировано в буфер обмена') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => showToast(successMsg),
        () => fallbackCopy(text, successMsg)
      );
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch {
      showToast('Не удалось скопировать');
    }
    document.body.removeChild(textArea);
  }

  // QR Modal Handlers
  function openQrModal() {
    if (elements.qrModal) {
      elements.qrModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQrModal() {
    if (elements.qrModal) {
      elements.qrModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Check Protocol (DonatePay blocks Referer-less requests from file:///)
  function checkProtocol() {
    if (window.location.protocol === 'file:' && elements.fileNotice) {
      elements.fileNotice.style.display = 'flex';
    }
  }

  // Event Listeners
  function initEventListeners() {
    // QR click to zoom
    elements.qrTriggers.forEach((trigger) => {
      trigger.addEventListener('click', openQrModal);
    });

    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeQrModal);
    }

    if (elements.qrModal) {
      elements.qrModal.addEventListener('click', (e) => {
        if (e.target === elements.qrModal) {
          closeQrModal();
        }
      });
    }

    // Keyboard (Esc closes modal)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.qrModal && elements.qrModal.classList.contains('open')) {
        closeQrModal();
      }
    });

    // Share link button
    if (elements.shareLinkBtn) {
      elements.shareLinkBtn.addEventListener('click', () => {
        copyToClipboard(window.location.href, 'Ссылка на страницу скопирована');
      });
    }
  }

  // Initialization
  document.addEventListener('DOMContentLoaded', () => {
    checkProtocol();
    initEventListeners();
  });
})();
