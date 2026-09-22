/**
 * Chat Application UI Logic
 * Handles interactive mentions, message sending, and responsive behaviors.
 */

$(document).ready(function () {
  const $chatInput = $('#chat-input');
  const $mentionPopup = $('#mention-popup');
  const $mentionTrigger = $('#btn-mention-trigger');
  const $mentionItems = $('.mention-item');
  const $messageList = $('#message-list');
  const $chatMessagesContainer = $('#chat-messages-container');
  const $btnSendMessage = $('#btn-send-message');
  const $btnDownload = $('#btn-download');

  // Helper to scroll to the bottom of the chat
  function scrollToBottom() {
    $chatMessagesContainer.animate(
      { scrollTop: $chatMessagesContainer[0].scrollHeight },
      200
    );
  }

  // Toggle mention popup visibility
  $mentionTrigger.on('click', function (e) {
    e.stopPropagation();
    $mentionPopup.toggleClass('hidden');
    $mentionTrigger.toggleClass('active', !$mentionPopup.hasClass('hidden'));
    $chatInput.focus();
  });

  // Handle clicking on a mention item
  $mentionItems.on('click', function (e) {
    e.stopPropagation();
    const username = $(this).data('username');
    const currentValue = $chatInput.val();

    // Set active class
    $mentionItems.removeClass('active');
    $(this).addClass('active');

    // Replace or insert mention
    if (currentValue.includes('@')) {
      const parts = currentValue.split('@');
      parts.pop(); // Remove the trailing query after last @
      $chatInput.val(parts.join('@') + '@' + username + ' ');
    } else {
      $chatInput.val('@' + username + ' ' + currentValue);
    }

    $mentionPopup.addClass('hidden');
    $mentionTrigger.removeClass('active');
    $chatInput.focus();
  });

  // Close mention popup when clicking outside
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#mention-popup, #btn-mention-trigger').length) {
      $mentionPopup.addClass('hidden');
      $mentionTrigger.removeClass('active');
    }
  });

  // Input typing listener to detect '@'
  $chatInput.on('input', function () {
    const val = $(this).val();
    const lastChar = val.slice(-1);
    
    if (lastChar === '@' || (val.includes('@') && !$mentionPopup.is(':visible'))) {
      $mentionPopup.removeClass('hidden');
      $mentionTrigger.addClass('active');
    } else if (!val.includes('@')) {
      $mentionPopup.addClass('hidden');
      $mentionTrigger.removeClass('active');
    }
  });

  // Send message function
  function sendMessage() {
    const text = $chatInput.val().trim();
    if (!text) return;

    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = hours + ':' + minutes + ' ' + ampm;

    // Create new outgoing message bubble
    const $newMsg = $(`
      <div class="message-row outgoing">
        <div class="message-bubble">
          <p class="message-content">${escapeHtml(text)}</p>
          <div class="message-meta">
            <span class="message-time">${formattedTime}</span>
            <span class="read-receipt-ticks" title="Sent">
              <svg viewBox="0 0 16 15">
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    `);

    $messageList.append($newMsg);
    $chatInput.val('');
    $mentionPopup.addClass('hidden');
    $mentionTrigger.removeClass('active');
    scrollToBottom();
  }

  // Send button click
  $btnSendMessage.on('click', function () {
    sendMessage();
  });

  // Enter key press in input
  $chatInput.on('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    } else if (e.key === 'Escape') {
      $mentionPopup.addClass('hidden');
      $mentionTrigger.removeClass('active');
    }
  });

  // Download button simulation
  $btnDownload.on('click', function (e) {
    e.stopPropagation();
    const $btn = $(this);
    $btn.css('transform', 'scale(0.9)');
    setTimeout(() => $btn.css('transform', 'scale(1)'), 150);
    alert('Starting download for client_portal_update.zip (2.4 MB)...');
  });

  // Simple HTML escaping helper
  function escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\n/g, '<br>');
  }
});
