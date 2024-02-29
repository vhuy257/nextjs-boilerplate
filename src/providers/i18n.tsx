'use client';
import { NextIntlClientProvider } from 'next-intl';
 
export default function I18nProvider({
  locale,
  timeZone,
  now,
  ...props
}: any) {
  return (
    <NextIntlClientProvider
      // Define non-serializable props here
      defaultTranslationValues={{
        i: (text) => <i>{text}</i>
      }}
      // Make sure to forward these props to avoid markup mismatches
      locale={locale}
      timeZone={timeZone}
      now={now}
      {...props}
    />
  );
}
