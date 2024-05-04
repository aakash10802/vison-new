import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useCreateSeriesModal } from "@/hooks/useCreateSeriesModal";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import useSeries from "@/hooks/useSeries";
import useSingleSeries from "@/hooks/useSingleSeries";
import useBillboard from "@/hooks/useBillboard";
import Loader from "../ui/Loader";

const seriesSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
    })
    .min(3, "minimum character is 3"),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(50, "minimum character is 50"),
  videoUrl: z.string({
    required_error: "url is required",
  }),
  thumbnailUrl: z.string({
    required_error: "url is required",
  }),
  genre: z.string({
    required_error: "genre is required",
  }),
  duration: z.string({
    required_error: "duration is required",
  }),
  seasons: z.string({
    required_error: "seasons is required",
  }),
  epizodes: z.string({
    required_error: "epizode is required",
  }),
});

const CreateSeries = () => {
  const { onClose, isOpen, seriesId } = useCreateSeriesModal();
  const { mutate } = useSeries();
  const { mutate: seriesMutate, isLoading: seriesLoading } =
    useSingleSeries(seriesId);
  const { mutate: billboardMutate } = useBillboard({ type: "series" });
  const { series } = useSingleSeries(seriesId);

  const [isLoading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(seriesSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      genre: "",
      duration: "",
      seasons: "",
      epizodes: "",
    },
  });

  useEffect(() => {
    if (!!seriesId) {
      if (series) {
        form.reset({
          description: series.description,
          duration: series.duration,
          epizodes: series.epizodes + "",
          genre: series.genre,
          seasons: series.seasons + "",
          thumbnailUrl: series.thumbnailUrl,
          title: series.title,
          videoUrl: series.videoUrl,
        });
      }
    } else {
      form.reset();
    }
  }, [series, seriesId, onClose]);

  const onSubmit = form.handleSubmit(
    async (values: z.infer<typeof seriesSchema>) => {
      try {
        setLoading(true);
        let req;
        if (series) {
          req = async () =>
            await axios
              .put(`/api/series/${series.id}`, { ...values, id: series.id })
              .then((res) => {
                toast.success(res.data.message);
                mutate();
                seriesMutate();
                billboardMutate();
                onClose();
              });
        } else {
          req = async () =>
            await axios.post("/api/series/create", values).then((res) => {
              toast.success(res.data.message);
              mutate();
              onClose();
            });
        }
        await req();
        form.reset();
      } catch (error: any) {
        if (error?.response?.data?.message) {
          toast.error(error.response.data.message);
        } else toast.error("something went wrong!");
      } finally {
        setLoading(false);
      }
    }
  );

  return (
    <Modal isVisible={isOpen} onClose={onClose} disable={isLoading}>
      <form
        onSubmit={onSubmit}
        className="px-5 py-10 w-screen max-w-full md:w-[550px] lg:w-[650px] h-screen md:h-[70vh]  flex flex-col gap-8  "
      >
        {!seriesLoading ? (
          <>
            <Input
              label="Title"
              name="title"
              onChange={(e) => form.setValue("title", e.target.value)}
              register={form.register("title")}
              value={form.watch("title")}
              disabled={isLoading}
              type="text"
            />
            <Input
              label="description"
              name="description"
              onChange={(e) => form.setValue("description", e.target.value)}
              register={form.register("description")}
              value={form.watch("description")}
              disabled={isLoading}
              type="text"
            />
            <Input
              label="thumbnailUrl"
              name="thumbnailUrl"
              onChange={(e) => form.setValue("thumbnailUrl", e.target.value)}
              register={form.register("thumbnailUrl")}
              value={form.watch("thumbnailUrl")}
              disabled={isLoading}
              type="text"
            />
            {form.watch("thumbnailUrl") && (
              <div className="relative min-w-full flex items-center justify-center object-cover rounded-lg overflow-hidden drop-shadow-2xl border-red-700 border-[1px] min-h-[300px]">
                <Image
                  alt="series image"
                  src={form.watch("thumbnailUrl")}
                  fill
                />
              </div>
            )}
            <Input
              label="videoUrl"
              name="videoUrl"
              onChange={(e) => form.setValue("videoUrl", e.target.value)}
              register={form.register("videoUrl")}
              value={form.watch("videoUrl")}
              disabled={isLoading}
              type="text"
            />
            {form.watch("videoUrl") && (
              <div className="min-w-full flex items-center justify-center overflow-hidden max-h-[300px] min-h-[300px] bg-black border-[1px] border-red-700 rounded-lg drop-shadow-2xl ">
                <video
                  src={form.watch("videoUrl")}
                  poster={form.watch("thumbnailUrl")}
                  autoPlay
                  muted
                  loop
                  className="min-w-full min-h-[300px] max-h-[300px] object-cover brightness-[60%]"
                ></video>
              </div>
            )}
            <Input
              label="genre"
              name="genre"
              onChange={(e) => form.setValue("genre", e.target.value)}
              register={form.register("genre")}
              value={form.watch("genre")}
              disabled={isLoading}
              type="text"
            />
            <Input
              label="duration"
              name="duration"
              onChange={(e) => form.setValue("duration", e.target.value)}
              register={form.register("duration")}
              value={form.watch("duration")}
              disabled={isLoading}
              type="text"
            />
            <Input
              label="seasons"
              name="seasons"
              onChange={(e) =>
                form.setValue(
                  "seasons",
                  isNaN(+e.target.value) ? "" : e.target.value
                )
              }
              register={form.register("seasons")}
              value={form.watch("seasons") as any}
              disabled={isLoading}
              type="number"
            />
            <Input
              label="epizodes"
              name="epizodes"
              onChange={(e) =>
                form.setValue(
                  "epizodes",
                  isNaN(+e.target.value) ? "" : e.target.value
                )
              }
              register={form.register("epizodes")}
              value={form.watch("epizodes") as any}
              disabled={isLoading}
              type="number"
            />
            <div className="min-w-full flex items-center justify-start gap-3 flex-col md:flex-row pb-5">
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
          </>
        ) : (
          <Loader message="Loading series data" />
        )}
      </form>
    </Modal>
  );
};

export default CreateSeries;
