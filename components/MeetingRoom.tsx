import { cn } from '@/lib/utils';
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutTypes = 'speaker-left' | 'speaker-right' | 'grid'

export default function MeetingRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState<CallLayoutTypes>('speaker-left');
    const [showParticipants, setShowParticipants] = useState(false);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader />


    const CallLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
            default:
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }

    return (
        <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
            <div className="relative flex size-full items-center justify-center">
                <div className=" flex size-full max-w-[1000px] items-center ">
                    <CallLayout />
                </div>
                <div className={cn("h-[calc(100vh-86px)] hidden ml-2", { 'show-block': showParticipants })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
                <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5">
                    <CallControls
                        onLeave={() => router.push('/')}
                    />
                    <DropdownMenu>
                        <div className="flex items-center">
                            <DropdownMenuTrigger className='cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]'>
                                <LayoutList size={20} className=" text-white" />
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent className='border-dark-1 bg bg-dark-1 text-white'>
                            {['grid', 'speaker-left', 'speaker-right'].map((layout, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={() => setLayout(layout as CallLayoutTypes)}
                                >
                                    <DropdownMenuItem className='cursor-pointer capitalize'>{layout}</DropdownMenuItem>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className='border-dark-1' />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <CallStatsButton />
                    <button
                        onClick={() => setShowParticipants(!showParticipants)}
                    >
                        <div className=" cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
                            <Users size={20} className=" text-white" />
                        </div>
                    </button>
                    {!isPersonalRoom && <EndCallButton />}
                </div>
            </div>
        </section>
    )
}
