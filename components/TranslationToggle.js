import { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { Stack, Card, Typography, Icon } from "@ui";

const StyledTranslationToggleCard = styled(Card)`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const TranslationToggle = ({ preferredLanguage }) => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // get preferred language from locale and set in state
  const [language, setLanguage] = useState(router.locale);

  const handleChangeLang = async (lang) => {
    // set the locale in the router and then in state
    router.push({ pathname, query }, asPath, { locale: lang });
    setLanguage(router.locale);
    // try {
    //   // send preferred language to server
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <StyledTranslationToggleCard size="small" elevated>
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
    </StyledTranslationToggleCard>
  );
};

export default TranslationToggle;
