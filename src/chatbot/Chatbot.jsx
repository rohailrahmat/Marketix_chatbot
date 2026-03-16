import React from "react";
import { ChatLauncher } from "./components/ChatLauncher";
import { ChatWindow } from "./components/ChatWindow";
import { useChatbot } from "./hooks/useChatbot";

export function Chatbot() {
  const {
    isOpen, messages, isTyping, showLeadForm, messagesEndRef,
    toggleChat, closeChat, sendMessage, submitLead, setShowLeadForm,
  } = useChatbot();

  return (
    <>
      <ChatLauncher isOpen={isOpen} onClick={toggleChat} />
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        isTyping={isTyping}
        showLeadForm={showLeadForm}
        messagesEndRef={messagesEndRef}
        onClose={closeChat}
        onSend={sendMessage}
        onQuickReply={sendMessage}
        onLeadSubmit={submitLead}
        onLeadDismiss={() => setShowLeadForm(false)}
      />
    </>
  );
}
