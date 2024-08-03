import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";


interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    image?: string;
    buttonText?: string;
    buttonIcon?: string;
    className?: string;
    children?: React.ReactNode;
    handleClick?: () => void;
}

export default function MeetingModal({ children, isOpen, onClose, title, className, image, buttonText, buttonIcon, handleClick }: MeetingModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogContent className="flex w-full max-w-[520px] border-none flex-col gap-6 bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} width={72} height={72} alt="image" />
                        </div>
                    )}
                    <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                    {children}
                    <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={handleClick}
                    >
                        {buttonIcon && (<Image src={buttonIcon} width={13} height={13} alt="buttonIcon" />)} &nbsp;
                        {buttonText || 'Schedule Meeting'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
