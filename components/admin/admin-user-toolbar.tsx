"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { SettingsForm } from "./settings-form";

export function AddAdminButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>Add admin</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add admin user">
        <SettingsForm endpoint="/api/admin/admin-users" submitLabel="Create admin" successMessage="Admin created" fields={[
          { name: "name", label: "Full name", required: true }, { name: "email", label: "Email", type: "email", required: true },
          { name: "role", label: "Role", type: "select", options: ["ADMIN", "MODERATOR", "SUPPORT"] },
          { name: "perms", label: "Permissions", type: "textarea", hint: "Payments and settings require explicit permission." },
        ]} />
      </Modal>
    </>
  );
}
