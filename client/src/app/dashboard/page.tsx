import DashNav from '@/components/dashboard/Dashnav'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/components/chatGroup/CreateChat'
import { fetchChatGroups } from '@/fetch/groupFetch'
import GroupChatCard from '@/components/chatGroup/GroupChatCard'

export default async function dashboard() {
    const session: CustomSession|null = await getServerSession(authOption)
    const groups: Array<GroupChatType> | [] = await fetchChatGroups(
        session?.user?.token!
      );
  return (
    <div>
    <DashNav
      name={session?.user?.name!}
      image={session?.user?.image ?? undefined}
    />
    <div className="container">
      <div className="mt-6 text-end">
        <CreateChat user={session?.user!} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 ml-10">
        {groups.length > 0 &&
          groups.map((item, index) => (
            <GroupChatCard group={item} key={index} user={session?.user!} />
          ))}
      </div>
    </div>
  </div>
  )
}
