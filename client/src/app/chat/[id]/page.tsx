import { Metadata } from 'next';
import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/fetchChats';
import { fetchChatGroup, fetchChatGroupUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // You can add metadata generation here if needed
  return {
    title: `Chat ${params.id}`,
  };
}

export default async function ChatPage({ params, searchParams }: Props) {
  const { id } = params;

  // Validate the id
  if (id.length !== 36) {
    notFound();
  }

  // Fetch necessary data
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