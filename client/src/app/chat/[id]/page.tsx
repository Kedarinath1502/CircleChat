import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/fetchChats';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function chat({ params }: { params: { id: string } }) {
  const { id } = params; // No `await` here, `params` is already a plain object

  // Validate `id`
  if (id.length !== 36) {
    return notFound();
  }

  // Fetch data
  const chatGroup: GroupChatType | null = await fetchChatGroup(id);
  if (chatGroup === null) {
    return notFound();
  }
  const chatGroupUsers: Array<GroupChatUserType> | [] = await fetchChatGroupUsers(id);
  const chats: Array<MessageType> | [] = await fetchChats(id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}
