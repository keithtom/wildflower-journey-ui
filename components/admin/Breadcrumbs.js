import { useRouter } from "next/router";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const { pathname, query } = router;

  // Split the pathname into an array of segments
  const segments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {segments.map((segment, index) => {
        const isLastSegment = index === segments.length - 1;
        const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
        const segmentValue = query[segment] || segment;

        return isLastSegment ? (
          <Typography key={segment} color="textPrimary">
            {segmentValue}
          </Typography>
        ) : (
          <Link key={segment} href={segmentPath} color="inherit">
            {segmentValue}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;
