"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export function useDeploy(deployHookUrl: string) {
  const [deployLoading, setDeployLoading] = useState(false);

  const triggerDeploy = async () => {
    if (deployLoading) return;
    setDeployLoading(true);

    const loadingToast = toast.loading("🚀 Redeploying your site...");

    try {
      const res = await fetch(deployHookUrl, { method: "POST" });

      if (res.ok) {
        toast.success("✅ Redeployment triggered successfully!");
      } else {
        const text = await res.text();
        toast.error(`❌ Redeploy failed: ${text || "Unknown error"}`);
      }
    } catch (err: any) {
      toast.error(`⚠️ Error: ${err.message}`);
    } finally {
      toast.dismiss(loadingToast);
      setDeployLoading(false);
    }
  };

  return { deployLoading, triggerDeploy };
}
