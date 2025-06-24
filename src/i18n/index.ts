import logger from "../config/logger";
import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { match } from "ts-pattern";
export const fallbackLng = "en";
export const languages = [fallbackLng, "ar"];
export const defaultNS = "translation";

i18next
    .use(initReactI18next)
    .use(
        resourcesToBackend(async (language: string, namespace: string) => {
            try {
                const module = await import(`../../src/locales/${language}/${namespace}.json`);
                return module.default;
            } catch (error) {
                logger.error(`[i18next Error]`, error);
                return {};
            }
        })
    )
    .init({
        supportedLngs: languages,
        fallbackLng,
        fallbackNS: defaultNS,
        defaultNS,
    });

export function useTranslation(
    lng: string,
    ns: string | string[],
    options: Record<string, string> = {}
) {
    i18next.changeLanguage(lng);

    const isArray = Array.isArray(ns);
    return {
        t: i18next.getFixedT(
            lng,
            match(isArray)
                .with(true, () => ns[0])
                .otherwise(() => ns),
            options.keyPrefix
        ),
        i18n: i18next,
    };
}