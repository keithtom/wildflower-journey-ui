import { useState } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { Stack, Card, Typography, Icon } from "@ui";

const StyledTranslationToggleCard = styled(Card)`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const TranslationToggle = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { workflow } = router.query;

  // get preferred language from locale and set in state
  const [language, setLanguage] = useState(
    router.locale ? router.locale : "en"
  );

  const handleChangeLang = async (lang) => {
    // set the locale in the router and then in state
    router.push({ pathname, query }, asPath, { locale: lang });
    setLanguage(lang);
    // try {
    //   // send preferred language to server
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const approvedWorkflowIds = ["5c8f-d17c"];
  const isApproved = approvedWorkflowIds.includes(workflow);
  // console.log({ workflow });
  // console.log({ isApproved });

  return isApproved ? (
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
  ) : null;
};

export default TranslationToggle;
