import useCurrentUser from "@/hooks/useCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Modal from "./Modal";
import { useProfileModal } from "@/hooks/useProfileModal";
import Input from "../inputs/Input";
import ImageUpload from "../inputs/ImageUpload";
import toast from "react-hot-toast";
import axios from "axios";

const ProfileSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
    })
    .min(3, "minimum character is 3"),
  image: z.string(),
  email: z
    .string({
      required_error: "email is required",
    })
    .email("email is not valid"),
  password: z.string().min(6).optional(),
});

const ProfileModal = () => {
  const { user, mutate } = useCurrentUser();
  const profileModal = useProfileModal();

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      image: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof ProfileSchema>) => {
      try {
        setLoading(true);
        await axios.post("/api/update", values).then((res) => {
          toast.success(res.data.message);
          mutate();
          form.reset();
          profileModal.onClose();
        });
      } catch (error: any) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
        toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <Modal
      disable={isLoading}
      isVisible={profileModal.isOpen}
      onClose={profileModal.onClose}
    >
      <form
        className="  w-screen md:w-[500px] lg:w-[600px] max-w-full overflow-x-hidden overflow-y-auto   bg-zinc-900 p-5 min-h-full flex flex-col items-start justify-start gap-4 text-white"
        onSubmit={onSubmit}
      >
        <ImageUpload
          label="Profile Image"
          onChange={(src) => form.setValue("image", src)}
          value={form.watch("image")}
          disabled={isLoading}
        />
        <Input
          label="Name"
          name="name"
          onChange={(e) => form.setValue("name", e.target.value)}
          register={form.register("name")}
          value={form.watch("name")}
          disabled={isLoading}
          type="text"
        />{" "}
        <Input
          label="Email"
          name="email"
          onChange={(e) => form.setValue("email", e.target.value)}
          register={form.register("email")}
          value={form.watch("email")}
          disabled={isLoading}
          type="email"
        />{" "}
        <Input
          label="Password"
          name="password"
          onChange={(e) => form.setValue("password", e.target.value)}
          register={form.register("password")}
          value={form.watch("password")}
          disabled={isLoading}
          type="password"
        />
        <div className="min-w-full flex items-center justify-start gap-3 flex-col md:flex-row">
          <button
            className="w-full md:w-fit text-white border-[1px] border-red-600 hover:opacity-80 bg-red-600 px-3 rounded-lg py-2 drop-shadow-2xl hover:bg-opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-50 "
            type="submit"
            disabled={isLoading}
          >
            Update
          </button>
          <button
            className="w-full md:w-fit hover:opacity-80 transition-all border-[1px] border-white text-white bg-transparent px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed  rounded-lg drop-shadow-2xl hover:bg-opacity-90"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
