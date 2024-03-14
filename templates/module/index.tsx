import { ZTable } from "@zcmjs/ui";
import schema from "./schema.json";
import { CreateButton } from "./create";

const formSearchSchema = {
  type: "object",
  properties: {
    ...schema.search
  }
};

export default () => {
  return (
    <>
      <ZTable
        objectSchema={schema as any}
        request={{
          url: schema.api.list
        }}
        columns={schema.table.default}
        columnActions={["edit", "delete"]}
        toolbarRender={<CreateButton />}
        search={schema.search ? {
          apiSeach: schema.api.list,
          formSchema: formSearchSchema,
        } : undefined}
      />
    </>
  );
}

