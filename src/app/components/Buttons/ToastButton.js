"use client";

import toast from "react-hot-toast";

// import { toast } from "sonner";

export default function ToastButton() {
  const notify = () => toast.loading("Here is your toast.");
  return <button onClick={notify}>Toast</button>;
}
