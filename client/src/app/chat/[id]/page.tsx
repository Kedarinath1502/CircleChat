import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/fetchChats';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react';

// Use the correct type definition for dynamic routes
export default async function ChatPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Validate the id
  if (id.length !== 36) {
    return notFound();
  }

  // Fetch necessary data
  const chatGroup = await fetchChatGroup(id);
  if (!chatGroup) {
    return notFound();
  }

  const chatGroupUsers = await fetchChatGroupUsers(id);
  const chats = await fetchChats(id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}
