import { useState } from "react";
import { styled } from "@mui/material/styles";

import { Stack, Card, Typography, Icon } from "@ui";

const StyledTranslationToggleCard = styled(Card)`
  position: fixed;
  bottom: 24px;
  right: 24px;
`;

const TranslationToggle = ({ preferredLanguage }) => {
  // get preferred language from props
  // use preferred language to set lang state
  const [language, setLanguage] = useState(preferredLanguage);

  const handleChangeLangaue = async (lang) => {
    setLanguage(lang);
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
          onClick={() => handleChangeLangaue("en")}
        >
          English
        </Typography>
        <Typography
          variant="bodyRegular"
          highlight={language === "es"}
          hoverable
          onClick={() => handleChangeLangaue("es")}
        >
          Español
        </Typography>
      </Stack>
    </StyledTranslationToggleCard>
  );
};

export default TranslationToggle;
