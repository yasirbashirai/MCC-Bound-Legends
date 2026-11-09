"use client";
import { useEffect } from "react";
import { readAttribution } from "@/lib/attribution";

/** Runs on every page so the landing page + gclid are stored even when the visitor lands on a page without a form. */
export function AttributionCapture() {
  useEffect(() => { readAttribution(); }, []);
  return null;
}
