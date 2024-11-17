import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/fetchChats';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = params;

  // Validate `id`
  if (id.length !== 36) {
    return notFound();
  }

  // Fetch data
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
