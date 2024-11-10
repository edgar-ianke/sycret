import { TextField } from "@mui/material";
import style from "./styles.module.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormValues } from "../../services/features/slice";
import { apiService } from "../../utils/api";
import { useMask } from "@react-input/mask";

export default function PurchasePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.certificates.form);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: "onChange", defaultValues: formValues });

  const inputRef = useMask({
    mask: "+7 (___) ___-__-__",
    showMask: true,
    replacement: { _: /\d/ },
    track: ({ inputType, value, data, selectionStart }) => {
      if (selectionStart === 0 && data?.startsWith('+7')) {
        return data.slice(2);
      }
      if (selectionStart === 0 && data?.startsWith('8') && data.length !== 1) {
        return data.slice(1);
      }
    },
  });

  const formFields = watch();
  const onSubmit = () => {
    const formattedPhone = formValues.phone
      .replace(/\D/g, "")
      .replace(/^7/, "");
    const data = {
      ...location.state.data,
      ...formValues,
      phone: formattedPhone,
    };
    apiService.purchaseCertificate(data).then(() => {
      navigate("/paid", { state: { from: location.pathname } });
    });
  };

  React.useEffect(() => {
    if (!location.state) navigate("/");
    if (JSON.stringify(formValues) !== JSON.stringify(formFields)) {
      dispatch(setFormValues(formFields));
    }
  }, [formFields, dispatch, formValues, location.state, navigate]);

  return (
    <div className={style.purchasePage}>
      <form noValidate className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={style.title}>{location.state.data.NAME}</h4>
        <TextField
          required
          error={!!errors.fullname}
          id="fullname"
          {...register("fullname", {
            required: "Это поле необходимо заполнить",
          })}
          label="ФИО"
          placeholder="Введите ФИО"
          variant="standard"
          helperText={errors.fullname && errors.fullname.message}
        />
        <TextField
          {...register("phone", {
            required: "Номер телефона обязателен",
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
              message: "Неверный формат номера телефона",
            },
          })}
          inputRef={inputRef}
          variant="standard"
          label="Телефон"
          color="primary"
          placeholder="Телефон"
          type="tel"
          helperText={errors.phone && errors.phone.message}
          error={!!errors.phone}
        />

        <TextField
          id="message"
          {...register("message")}
          label="Доп. информация"
          placeholder="Если хотите, оставьте своё сообщение"
          variant="standard"
          multiline
        />

        <TextField
          required
          error={!!errors.email}
          id="email"
          {...register("email", {
            required: "Это поле необходимо заполнить",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат email",
            },
          })}
          label="Электронная почта"
          placeholder="Введите свою почту"
          variant="standard"
          type="email"
          helperText={errors.email && errors.email.message}
        />

        <ButtonGroup
          className={style.buttonGroup}
          variant="contained"
          aria-label="Loading button group"
        >
          <Link to="/">
            <Button>Назад</Button>
          </Link>
          <Button type="submit" disabled={!isValid} color="success">
            Оформить
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
