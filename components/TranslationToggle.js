import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

import { Select } from "@ui";
import { useUserContext } from "@lib/useUserContext";
import usePerson from "@hooks/usePerson";
import peopleApi from "@api/people";

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Español", value: "es" },
];

const TranslationToggle = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // get relevant data
  const { currentUser } = useUserContext();
  const { data: personData, isLoading } = usePerson(currentUser?.id, {
    network: true,
  });
  const person = personData?.data;

  // initialize language state
  const [language, setLanguage] = useState(router.locale || "en");

  useEffect(() => {
    if (
      person?.attributes?.preferredLanguage &&
      person?.attributes?.preferredLanguage !== language
    ) {
      // if a preferred language is set and different from the current language, use it
      setLanguage(person?.attributes?.preferredLanguage);
      router.push({ pathname, query }, asPath, {
        locale: person?.attributes?.preferredLanguage,
      });
    }
  }, [person]);

  const handleChangeLang = async (value) => {
    // when changing language set it in the locale
    router.push({ pathname, query }, asPath, { locale: value });
    // set the language state to the changed language
    setLanguage(value);
    try {
      // send preferred language to be the changed language server
      const response = await peopleApi.update(currentUser.id, {
        person: {
          preferred_language: value,
        },
      });
      // mutate the endpoint to reload the person data and trigger the useEffect
      mutate(`/v1/people/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Select
      value={language}
      onChange={(e) => handleChangeLang(e.target.value)}
      options={languageOptions}
      size="small"
    />
  );
};

export default TranslationToggle;
