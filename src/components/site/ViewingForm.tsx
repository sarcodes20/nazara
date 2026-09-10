"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { viewingSchema, PROJECT_TYPES, type ViewingInput } from "@/lib/viewing-schema";
import { useSelection } from "@/components/selection/SelectionProvider";
import { STONE_MAP } from "@/data/stones";
import { EASE } from "@/lib/motion";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea, Tick } from "@/components/ui/Field";
import { Eyebrow, Mono, Body } from "@/components/ui/primitives";
import { MasonLine } from "@/components/motion/MasonLine";

/**
 * Seven fields, two plates, all visible at once, answerable in ninety seconds.
 *
 * Validation runs on blur, never on keystroke, and the submit button is never
 * disabled-until-valid — a greyed button that will not say why is the rudest
 * control in interface design.
 */
export function ViewingForm() {
  const { slugs, clear } = useSelection();
  const params = useSearchParams();
  const fromSelection = params.get("from") === "selection" && slugs.length > 0;
  const [sent, setSent] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ViewingInput>({
    resolver: zodResolver(viewingSchema),
    mode: "onBlur",
    defaultValues: { consent: false as never, stones: slugs },
  });

  const consent = watch("consent");

  const onSubmit = async (values: ViewingInput) => {
    const res = await fetch("/api/viewing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, stones: slugs }),
    });
    if (!res.ok) {
      setSent("error");
      return;
    }
    const { reference } = (await res.json()) as { reference: string };
    setSent(reference);
    clear();
  };

  // Success: the form area wipes to Viewing Room and one line arrives. No
  // modal, no tick, no confetti, no redirect.
  if (sent && sent !== "error") {
    return (
      <motion.div
        className="viewing-room flex min-h-[24rem] flex-col justify-center gap-5 bg-ground p-8"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 0.6, ease: EASE.stone }}
      >
        <MasonLine
          as="p"
          immediate
          delay={0.4}
          lines={[
            "Your viewing is being arranged.",
            "We will write within one working day.",
          ]}
          className="font-display text-h3-fluid text-ink"
        />
        <Mono size="data-s" className="mt-2">
          {sent}
        </Mono>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12" noValidate>
      {fromSelection ? (
        <Body size="body-s" className="text-ink">
          {slugs.length} stone{slugs.length === 1 ? "" : "s"} from your selection{" "}
          {slugs.length === 1 ? "is" : "are"} attached to this request.
          <span className="mt-2 block font-mono text-data-s uppercase text-ink-3">
            {slugs
              .map((s) => STONE_MAP.get(s)?.name)
              .filter(Boolean)
              .join(" · ")}
          </span>
        </Body>
      ) : null}

      <fieldset className="flex flex-col gap-7 border border-line p-6">
        <legend className="px-2">
          <Eyebrow>You</Eyebrow>
        </legend>
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <Input
            id="name"
            placeholder="Full name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            placeholder="Where we should write"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
        </Field>
        <Field label="Practice or studio" htmlFor="practice">
          <Input id="practice" placeholder="Optional" {...register("practice")} />
        </Field>
      </fieldset>

      <fieldset className="flex flex-col gap-7 border border-line p-6">
        <legend className="px-2">
          <Eyebrow>The project</Eyebrow>
        </legend>
        <Field label="Location" htmlFor="location" error={errors.location?.message}>
          <Input
            id="location"
            placeholder="City, country"
            aria-invalid={!!errors.location}
            {...register("location")}
          />
        </Field>
        <Field label="Type" htmlFor="type" error={errors.type?.message}>
          <Select id="type" defaultValue="" aria-invalid={!!errors.type} {...register("type")}>
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Approximate area" htmlFor="area" error={errors.area?.message}>
          <Input
            id="area"
            inputMode="numeric"
            placeholder="In square metres"
            aria-invalid={!!errors.area}
            {...register("area")}
          />
        </Field>
        <Field label="Anything you already know" htmlFor="notes">
          <Textarea
            id="notes"
            placeholder="A stone, a room, a date. Optional."
            {...register("notes")}
          />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-6">
        <Tick
          id="consent"
          checked={consent === true}
          onCheckedChange={(v) => setValue("consent", v as true, { shouldValidate: true })}
        >
          You may write to me about this project.
        </Tick>
        {errors.consent ? (
          <span role="alert" className="text-caption text-error">
            {errors.consent.message}
          </span>
        ) : null}

        <Button type="submit" variant="ink" className="w-full sm:w-fit">
          {isSubmitting ? "Sending" : "Request a viewing"}
        </Button>

        {sent === "error" ? (
          <span role="alert" className="text-caption text-error">
            That did not send. Try again, or write to viewings@nazara.in.
          </span>
        ) : null}
      </div>
    </form>
  );
}
