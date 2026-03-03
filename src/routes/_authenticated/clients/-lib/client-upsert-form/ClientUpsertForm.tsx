import { useAppForm } from "@/hooks/use-app-form";
import { ClientUpsertFormSchema } from "@/schemas/clientSchemas";
import { useClientUpsertFormDefaultValues } from "./utils";
import { Drawer } from "@/components/drawer";
import { Button } from "@/components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createClientMutationOptions,
  getClientByIdQueryOptions,
  updateClientMutationOptions,
} from "@/query-options/clientQueryOptions";
import { useUser } from "@/hooks/use-user";
import { getRouteApi } from "@tanstack/react-router";

const clientsRouteApi = getRouteApi("/_authenticated/clients/");

export const ClientUpsertForm = () => {
  const user = useUser();
  const { editId } = clientsRouteApi.useSearch();

  const { data: client, isFetching: isLoadingClient } = useQuery({
    ...getClientByIdQueryOptions({
      id: editId ?? "",
      userId: user.id,
    }),
    enabled: !!editId,
  });

  const defaultValues = useClientUpsertFormDefaultValues(client);

  const form = useAppForm({
    defaultValues,
    validators: {
      onChange: ClientUpsertFormSchema,
    },
    onSubmit: async (values) => {
      if (editId) {
        await updateClient({
          id: editId,
          name: values.value.name,
          email: values.value.email,
          userId: user.id,
        });
      } else {
        await createClient({
          name: values.value.name,
          email: values.value.email,
          userId: user.id,
        });
      }
    },
  });

  const { mutateAsync: createClient } = useMutation(
    createClientMutationOptions({
      userId: user.id,
    }),
  );

  const { mutateAsync: updateClient } = useMutation(
    updateClientMutationOptions({
      userId: user.id,
    }),
  );

  return (
    <form.Root form={form} isLoading={isLoadingClient}>
      <Drawer.Body>
        <form.Group>
          <form.AppField
            name="name"
            children={(field) => <field.TextInput label="Name" />}
          />
          <form.AppField
            name="email"
            children={(field) => <field.TextInput label="Email" />}
          />
        </form.Group>

        <Drawer.Footer>
          <Button type="submit">Create</Button>
        </Drawer.Footer>
      </Drawer.Body>
    </form.Root>
  );
};
