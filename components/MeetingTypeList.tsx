'use client';

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Description } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import { title } from "process";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

export default function MeetingTypeList() {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isScheduleMeeting' | 'isInstantMeeting' | undefined>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();
    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!client || !user) return;
        try {
            if (!values.dateTime) toast({ title: 'Please select a date and time' });
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create call');

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description,
                    },
                }
            });
            setCallDetails(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`);
            }
            toast({ title: 'Meeting Created' });
        } catch (error) {
            console.log('Error happened while creating meeting', error);
            toast({ title: 'Error happened while creating meeting' });
        }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:flex ">
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start an Instant Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className="bg-orange-1"
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your Meeting"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className="bg-blue-1"
            />
            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check out your Recordings"
                handleClick={() => router.push('/recordings')}
                className="bg-purple-1"
            />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="Via Invitation Link"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className="bg-yellow-1"
            />
            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Schedule a Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="description" className="text-base font-normal leading-[22px] text-sky-2">Description</label>
                        <Textarea
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={(e) => setValues({ ...values, description: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-2.5">
                        <label htmlFor="description" className="text-base font-normal leading-[22px] text-sky-2">Select Date and Time</label>
                        <ReactDatePicker
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeCaption="time"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="w-full rounded bg-dark-2 p-2 focus:outline-none"
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title="Meeting Scheduled"
                    className="text-center"
                    buttonText="Copy Meeting Link"
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: 'Meeting Link Copied to Clipboard' })
                    }}
                />
            )
            }
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start an Instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Type Meeting ID"
                className="text-center"
                buttonText="Join Meeting"
                handleClick={() => router.push(`${values.link}`)}
            >
                <div className="flex flex-col gap-2.5">
                    <Input
                        className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Meeting Link"
                        onChange={(e) => setValues({ ...values, link: e.target.value })}
                    />
                </div>
            </MeetingModal>
        </section>
    )
}
