import type { WrappedRecentItem } from "metabase/nav/components/search/RecentsList";
import type { WrappedResult } from "metabase/search/types";
import { Icon } from "metabase/ui";
import type { SearchModel } from "metabase-types/api";

import { CollectionIcon } from "./CollectionIcon";
import { DefaultIcon } from "./DefaultIcon";
import { IconWrapper } from "./ItemIcon.styled";

export interface IconComponentProps {
  item: WrappedResult | WrappedRecentItem;
  type: SearchModel;
}

const IconComponent = ({ item, type }: IconComponentProps) => {
  if (type === "table") {
    return <Icon name="database" />;
  }

  if (type === "collection") {
    return <CollectionIcon item={item} />;
  }

  return <DefaultIcon item={item} />;
};

interface ItemIconProps {
  active: boolean;
  item: WrappedResult | WrappedRecentItem;
  type: SearchModel;
  "data-testid"?: string;
}

export const ItemIcon = ({
  active,
  item,
  type,
  "data-testid": dataTestId,
}: ItemIconProps) => {
  return (
    <IconWrapper type={type} active={active} data-testid={dataTestId}>
      <IconComponent item={item} type={type} />
    </IconWrapper>
  );
};
