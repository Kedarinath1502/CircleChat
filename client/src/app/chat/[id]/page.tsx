import { Metadata } from 'next';
import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/fetchChats';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Chat ${params.id}`,
  };
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = params;

  if (id.length !== 36) {
    notFound();
  }

  const chatGroup = await fetchChatGroup(id);
  if (!chatGroup) {
    notFound();
  }

  const chatGroupUsers = await fetchChatGroupUsers(id);
  const chats = await fetchChats(id);

  return (
    <div>
      <ChatBase group={chatGroup} users={chatGroupUsers} oldMessages={chats} />
    </div>
  );
}