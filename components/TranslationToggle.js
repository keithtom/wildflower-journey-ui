import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { mutate } from "swr";

import { Stack, Card, Typography, Icon } from "@ui";
import { useUserContext } from "@lib/useUserContext";
import usePerson from "@hooks/usePerson";
import peopleApi from "@api/people";

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

  const handleChangeLang = async (lang) => {
    // when changing language set it in the locale
    router.push({ pathname, query }, asPath, { locale: lang });
    // set the language state to the changed language
    setLanguage(lang);
    try {
      // send preferred language to be the changed language server
      const response = await peopleApi.update(currentUser.id, {
        person: {
          preferred_language: lang,
        },
      });
      // mutate the endpoint to reload the person data and trigger the useEffect
      mutate(`/v1/people/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card size="small">
      <Stack direction="row" spacing={2} alignItems="center">
        <Icon type="globe" size="small" variant="lightened" />
        <Typography
          variant="bodyRegular"
          highlight={language === "en"}
          hoverable
          onClick={() => handleChangeLang("en")}
        >
          English
        </Typography>
        <Typography
          variant="bodyRegular"
          highlight={language === "es"}
          hoverable
          onClick={() => handleChangeLang("es")}
        >
          Español
        </Typography>
      </Stack>
    </Card>
  )
};

export default TranslationToggle;
