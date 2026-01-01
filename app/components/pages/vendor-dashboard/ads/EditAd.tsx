"use client";

import React, { useState } from "react";
import ImageUpload from "./HandleImageUpload";
import { useNotification } from "@/app/contexts/NotificationProvider";
import Loader from "@/app/components/general/Loader";
import { Ad } from "@/lib/types";

interface Props {
  adData: Ad;
  onUpdate?: () => void;
}

export default function EditAd({ adData, onUpdate }: Props) {
  const [formData, setFormData] = useState({
    title: adData.title || "",
    description: adData.description || "",
    price: adData.price || "",
    bedrooms: adData.bedrooms || "",
    bathrooms: adData.bathrooms || "",
    listing_type: adData.listing_type || "",
    category: adData.business.business_name || "",
  });

  const [imageData, setImageData] = useState<{
    existing: string[];
    newFiles: File[];
  }>({
    existing: adData.photo_urls || [],
    newFiles: [],
  });

  const [loading, setLoading] = useState(false);
  const [adStatus, setAdStatus] = useState<string>(adData.status);
  const [processing, setProcessing] = useState(false);
  const { notify } = useNotification();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImages = (data: { existing: string[]; newFiles: File[] }) => {
    setImageData(data);
  };

  // Handle Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //  Basic validation
    if (!formData.title.trim()) return notify("Ad title is required.", "error");
    if (!formData.description.trim())
      return notify("Description is required.", "error");
    if (!formData.price || Number(formData.price) <= 0)
      return notify("Enter a valid price.", "error");
    if (!formData.bedrooms || Number(formData.bedrooms) <= 0)
      return notify("Enter number of bedrooms.", "error");
    if (!formData.bathrooms || Number(formData.bathrooms) <= 0)
      return notify("Enter number of bathrooms.", "error");
    if (!formData.listing_type)
      return notify("Please select a listing type.", "error");
    if (imageData.existing.length === 0 && imageData.newFiles.length === 0)
      return notify("Please upload at least one image.", "error");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("User not authenticated.", "error");
        setLoading(false);
        return;
      }

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("price", String(formData.price));
      form.append("bedrooms", String(formData.bedrooms));
      form.append("bathrooms", String(formData.bathrooms));
      form.append("listing_type", formData.listing_type);

      // Existing image URLs
      imageData.existing.forEach((url, index) => {
        form.append(`existing_photos[${index}]`, url);
      });

      // New image files
      imageData.newFiles.forEach((file, index) => {
        form.append(`photos[${index}]`, file);
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${adData.id}/update`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update ad");
      }

      await res.json();
      notify("Ad updated successfully", "success", "Changes Saved");
      onUpdate?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "";
      notify(errorMessage || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Pause Ad
  const handlePauseAd = async () => {
    const prevStatus = adStatus;
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("User not authenticated.", "error");
        setProcessing(false);
        return;
      }

      const form = new FormData();
      form.append("status", "paused");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${adData.id}/pause`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        notify(
          errorData.message || "Something went wrong while pausing the ad.",
          "error"
        );
        throw new Error(errorData.message || "Failed to pause ad.");
      }
      setAdStatus("paused");
      notify("Ad paused successfully.", "paused", "Ad Paused");
      onUpdate?.();
    } catch (error) {
      console.error(error);
      setAdStatus(prevStatus);
    } finally {
      setProcessing(false);
    }
  };

  // Handle Resume Ad
  const handleResumeAd = async () => {
    const prevStatus = adStatus;
    setProcessing(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("User not authenticated.", "error");
        setProcessing(false);
        return;
      }

      const form = new FormData();
      form.append("status", "active");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${adData.id}/resume`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: form,
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to resume ad.");
      }

      setAdStatus("active");
      notify("Ad resumed successfully.", "resume", "Ad Resumed");
      onUpdate?.();
    } catch (error) {
      console.error(error);
      setAdStatus(prevStatus);
      notify("Something went wrong while resuming the ad.", "error");
    } finally {
      setProcessing(false);
    }
  };

  // Loader
  if (loading) return <Loader />;

  return (
    <div>
      <form className="flex flex-col gap-2 px-2 py-4 border border-[var(--foundation-neutral-6)] rounded-sm">
        <h2 className="font-semibold text-[14px] text-[var(--heading-color)]">
          Edit Ad Details
        </h2>
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Ad Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Vineyard Estate"
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Nestled in a serene and well-developed neighborhood..."
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="price"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Pricing <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="50000000"
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Bedrooms */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bedrooms"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Bed Room <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="4"
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Bathrooms */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="bathrooms"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Bath Room <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="4"
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="category"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            readOnly
            value={formData.category}
            className="px-2 py-1 border border-[--foundation-neutral-6] rounded-sm w-full text-[12px]"
          />
        </div>

        {/* Listing */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="listing_type"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Listing <span className="text-red-500">*</span>
          </label>
          <select
            id="listing_type"
            name="listing_type"
            value={formData.listing_type}
            onChange={handleChange}
            className="p-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full text-[12px] capitalize"
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Lease">Lease</option>
            <option value="Shortlet">Shortlet</option>
          </select>
        </div>

        {/* Images */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="images"
            className="font-semibold text-[13px] text-[var(--heading-color)]"
          >
            Images <span className="text-red-500">*</span>
          </label>
          <ImageUpload onChange={handleImages} adData={adData} />
        </div>
      </form>

      {/* Buttons */}
      <div className="flex flex-col gap-2 mt-3">
        <button
          onClick={handleSubmit}
          type="button"
          disabled={loading}
          className="bg-[var(--primary-color)] disabled:opacity-50 px-4 py-2 rounded-sm font-semibold text-[14px] text-white cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {adStatus === "paused" ? (
          <button
            onClick={handleResumeAd}
            disabled={processing}
            className="px-4 py-2 border border-[var(--success-color)] rounded-sm font-semibold text-[14px] text-[var(--success-color)] cursor-pointer disabled:cursor-not-allowed"
          >
            {processing ? "Resuming..." : "Resume Ad"}
          </button>
        ) : (
          <button
            onClick={handlePauseAd}
            disabled={processing}
            className="px-4 py-2 border border-[var(--brand-accent-color)] rounded-sm font-semibold text-[14px] text-[var(--brand-accent-color)] cursor-pointer disabled:cursor-not-allowed"
          >
            {processing ? "Pausing..." : "Pause Ad"}
          </button>
        )}
      </div>
    </div>
  );
}
