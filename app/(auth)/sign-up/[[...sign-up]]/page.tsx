import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <main className="flex-center h-screen w-full">
            <SignUp />
        </main>
    );
}