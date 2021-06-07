import { Input, Stack, Button, DrawerFooter } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import request from "../api/providerRequests";

const ProviderForm = ({ renderData, data }) => {
  const { register, handleSubmit } = useForm();
  const _id = data?._id;

  if (_id) {
    const onSubmit = async (data) => {
      await request.updateRecord(_id, data);
      renderData.setRender(!renderData.render);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Input
            {...register("name")}
            defaultValue={data.name}
            variant="flushed"
            placeholder="Nombre"
          />
          <Input
            {...register("comment")}
            defaultValue={data.comment}
            variant="flushed"
            placeholder="Comentario"
          />
          <Input
            {...register("checkingAccount")}
            defaultValue={data.checkingAccount}
            variant="flushed"
            type="number"
            placeholder="Cuenta corriente"
          />
        </Stack>
        <DrawerFooter>
          <Button type="submit" colorScheme="blue">
            Modificar
          </Button>
        </DrawerFooter>
      </form>
    );
  }

  const onSubmit = async (data) => {
    await request.postRecord(data);
    renderData.setRender(!renderData.render);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Input {...register("name")} variant="flushed" placeholder="Nombre" />
        <Input
          {...register("checkingAccount")}
          variant="flushed"
          type="number"
          placeholder="Cuenta corriente"
        />
        <Input
          {...register("comment")}
          variant="flushed"
          placeholder="Comentario"
        />
      </Stack>
      <DrawerFooter>
        <Button type="submit" colorScheme="blue">
          Crear
        </Button>
      </DrawerFooter>
    </form>
  );
};

export default ProviderForm;
