/* eslint-disable react/prop-types */
import { t, ngettext, msgid } from "ttag";

import Tooltip from "metabase/core/components/Tooltip";
import CS from "metabase/css/core/index.css";

import {
  ReadPermissionLabel,
  WritePermissionLabel,
} from "./PermissionsConfirm.styled";

const GroupName = ({ group }) => (
  <span className={CS.textBrand}>{group.name}</span>
);

const DatabaseName = ({ database }) => (
  <span className={CS.textBrand}>{database.name}</span>
);

const TableAccessChange = ({ tables, verb, colorClassName }) => {
  const tableEntries = Object.entries(tables);
  return (
    <span>
      {verb}
      <Tooltip
        tooltip={
          <div className={CS.p1}>
            {tableEntries.map(([id, table]) => (
              <div key={id}>{table.name}</div>
            ))}
          </div>
        }
      >
        <span>
          <span className={colorClassName}>
            {" " +
              (n => ngettext(msgid`${n} table`, `${n} tables`, n))(
                tableEntries.length,
              )}
          </span>
        </span>
      </Tooltip>
    </span>
  );
};

const PermissionsConfirm = ({ diff }) => (
  <div>
    {Object.values(diff.groups).map((group, groupIndex) =>
      Object.values(group.databases).map((database, databaseIndex) => (
        <div key={`${groupIndex}:${databaseIndex}`}>
          {(database.grantedTables || database.revokedTables) && (
            <div>
              <GroupName group={group} />
              {t` will be `}
              {database.grantedTables && (
                <TableAccessChange
                  verb={t`given access to`}
                  colorClassName={CS.textSuccess}
                  tables={database.grantedTables}
                />
              )}
              {database.grantedTables && database.revokedTables && t` and `}
              {database.revokedTables && (
                <TableAccessChange
                  verb={t`denied access to`}
                  colorClassName={CS.textError}
                  tables={database.revokedTables}
                />
              )}
              {" in "}
              <DatabaseName database={database} />
              {"."}
            </div>
          )}
          {database.native && (
            <div>
              <GroupName group={group} />
              {database.native === "none"
                ? t` will no longer be able to `
                : t` will now be able to `}
              {database.native === "read" ? (
                <ReadPermissionLabel>{t`read`}</ReadPermissionLabel>
              ) : database.native === "write" ? (
                <WritePermissionLabel>{t`write`}</WritePermissionLabel>
              ) : (
                <span>{t`read or write`}</span>
              )}
              {t` native queries for `}
              <DatabaseName database={database} />
              {"."}
            </div>
          )}
        </div>
      )),
    )}
  </div>
);

export default PermissionsConfirm;
