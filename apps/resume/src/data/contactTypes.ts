import type { ComponentType, SVGProps } from "react";
import type { ContactType } from "@/types";
import MailIcon from "@/assets/icons/mail.svg?react";
import PhoneIcon from "@/assets/icons/phone.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";
import GlobeIcon from "@/assets/icons/globe.svg?react";
import LinkedInIcon from "@/assets/icons/linkedin.svg?react";
import GitHubIcon from "@/assets/icons/github.svg?react";
import XIcon from "@/assets/icons/x.svg?react";
import InstagramIcon from "@/assets/icons/instagram.svg?react";
import TelegramIcon from "@/assets/icons/telegram.svg?react";
import WhatsappIcon from "@/assets/icons/whatsapp.svg?react";
import YoutubeIcon from "@/assets/icons/youtube.svg?react";
import ImageIcon from "@/assets/icons/image.svg?react";
import DribbbleIcon from "@/assets/icons/dribbble.svg?react";
import CodeIcon from "@/assets/icons/code.svg?react";
import PencilIcon from "@/assets/icons/pencil.svg?react";
import AtSignIcon from "@/assets/icons/at-sign.svg?react";
import LinkIcon from "@/assets/icons/link.svg?react";

/** Strips a leading protocol (and "www.") from a URL for display purposes. */
const stripProtocol = (value: string) => value.replace(/^https?:\/\/(www\.)?/, "");

/** Prefixes a bare domain/handle with https:// if it has no protocol. */
const normalizeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : `https://${value}`);

/** Configuration for rendering and linking a single contact type. */
export interface ContactTypeConfig {
  type: ContactType;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  labelKey: string;
  fallbackLabel: string;
  buildHref?: (value: string) => string;
  formatDisplay?: (value: string) => string;
}

/** All supported contact types, in the order offered to users. */
export const CONTACT_TYPES: ContactTypeConfig[] = [
  {
    type: "email",
    icon: MailIcon,
    labelKey: "contactType.email",
    fallbackLabel: "Email",
    buildHref: (v) => `mailto:${v}`,
  },
  {
    type: "phone",
    icon: PhoneIcon,
    labelKey: "contactType.phone",
    fallbackLabel: "Phone",
    buildHref: (v) => `tel:${v.replace(/\s+/g, "")}`,
  },
  {
    type: "location",
    icon: LocationIcon,
    labelKey: "contactType.location",
    fallbackLabel: "Location",
  },
  {
    type: "website",
    icon: GlobeIcon,
    labelKey: "contactType.website",
    fallbackLabel: "Website",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "linkedin",
    icon: LinkedInIcon,
    labelKey: "contactType.linkedin",
    fallbackLabel: "LinkedIn",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "github",
    icon: GitHubIcon,
    labelKey: "contactType.github",
    fallbackLabel: "GitHub",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "x",
    icon: XIcon,
    labelKey: "contactType.x",
    fallbackLabel: "X",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "instagram",
    icon: InstagramIcon,
    labelKey: "contactType.instagram",
    fallbackLabel: "Instagram",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "telegram",
    icon: TelegramIcon,
    labelKey: "contactType.telegram",
    fallbackLabel: "Telegram",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "whatsapp",
    icon: WhatsappIcon,
    labelKey: "contactType.whatsapp",
    fallbackLabel: "WhatsApp",
    buildHref: (v) => `https://wa.me/${v.replace(/\D/g, "")}`,
  },
  {
    type: "youtube",
    icon: YoutubeIcon,
    labelKey: "contactType.youtube",
    fallbackLabel: "YouTube",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "behance",
    icon: ImageIcon,
    labelKey: "contactType.behance",
    fallbackLabel: "Behance",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "dribbble",
    icon: DribbbleIcon,
    labelKey: "contactType.dribbble",
    fallbackLabel: "Dribbble",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "stackoverflow",
    icon: CodeIcon,
    labelKey: "contactType.stackoverflow",
    fallbackLabel: "Stack Overflow",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "medium",
    icon: PencilIcon,
    labelKey: "contactType.medium",
    fallbackLabel: "Medium",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "mastodon",
    icon: AtSignIcon,
    labelKey: "contactType.mastodon",
    fallbackLabel: "Mastodon",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
  {
    type: "custom",
    icon: LinkIcon,
    labelKey: "contactType.custom",
    fallbackLabel: "Custom",
    buildHref: normalizeUrl,
    formatDisplay: stripProtocol,
  },
];

const CONTACT_TYPE_MAP = new Map(CONTACT_TYPES.map((config) => [config.type, config]));

/** Looks up display/link config for a contact type, falling back to "custom". */
export const getContactTypeConfig = (type: ContactType): ContactTypeConfig =>
  CONTACT_TYPE_MAP.get(type) ?? CONTACT_TYPE_MAP.get("custom")!;
