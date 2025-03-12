"use client";

import styles from "./forms.module.scss";

import { getCurrency } from "@/utils/currency";
import {
  STORES,
  SHIPPING_METHODS,
  BAG_OPTIONS,
  HUNGRY_SHIP_FEE,
} from "@/lib/constants";
import Form from "next/form";
import { object, string, number, date } from "yup";
import ButtonSecondary from "../Buttons/ButtonSecondary";
import StarRating from "./StarRating";

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const FormInput = ({
  label,
  type,
  ref,
  placeholder,
  required,
  errorMsg,
  className,
  props,
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={label}>
        {label.charAt(0).toUpperCase() + label.slice(1) + (required ? "*" : "")}
      </label>
      {errorMsg && <span className={styles.formError}>{errorMsg}</span>}
      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        required={required}
        ref={ref}
        {...props}
      />
    </div>
  );
};

const FormInputTextarea = ({
  label,
  id,
  placeholder,
  ref,
  rows,
  className,
}) => {
  return (
    <div className={` ${styles.formGroup} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <textarea
        type="text"
        id={id}
        name={id}
        placeholder={placeholder}
        rows={rows}
        ref={ref}
      />
    </div>
  );
};

const validateForm = async (formData, schema) => {
  const formErrors = {};
  try {
    await schema.validate(formData, {
      abortEarly: false,
    });
  } catch (err) {
    console.log(err);
    err.inner.forEach((error) => {
      formErrors[error.path] = error.message;
    });
    return formErrors;
  }
  return formErrors;
};

export const FormCollectOption = forwardRef(
  ({ onPickUpSelect, onDeliverySelect }, ref) => {
    const [deliveryOption, setDeliveryOption] = useState("");
    const [errors, setErrors] = useState({});
    const storeRef = useRef();
    const formRef = useRef(null);

    const COLLECT_OPTIONS = ["pickup", "delivery"];

    const collectOptionSchema = object({
      deliveryOption: string()
        .required("Delivery option is required")
        .oneOf(COLLECT_OPTIONS, "Invalid collect options"),
      store: string().when("deliveryOption", {
        is: "pickup",
        then: (collectOptionSchema) =>
          collectOptionSchema.oneOf(STORES, "Invalid store selected"),
      }),
    });

    const handleOptionChange = (e) => {
      setDeliveryOption(e.target.value);
      if (e.target.value === "pickup") {
        onPickUpSelect();
      }
      if (e.target.value === "delivery") {
        onDeliverySelect();
      }
    };

    const extractAndValidateData = async () => {
      const formData = {
        deliveryOption: deliveryOption,
        store: storeRef.current.value,
      };
      const validationErrors = await validateForm(
        formData,
        collectOptionSchema
      );
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return { isValid: false, errors: validationErrors };
      } else {
        setErrors({});
        return { isValid: true, data: formData };
      }
    };

    useImperativeHandle(ref, () => ({
      extractAndValidateData,
    }));

    return (
      <form
        className={styles.form}
        ref={formRef}
        onSubmit={extractAndValidateData}
      >
        <h3 className={styles["form-heading"]}>First - Collect Options</h3>
        <div className={styles.radioGroup}>
          <div className={`${styles.formGroup} ${styles["formGroup--radio"]}`}>
            <input
              type="radio"
              id="pickup"
              name="deliveryOption"
              value="pickup"
              checked={deliveryOption === "pickup"}
              onChange={handleOptionChange}
              required
            />
            <label htmlFor="pickup" className={styles["radio-label"]}>
              Pick Up from Store
            </label>
          </div>
          <div className={`${styles.formGroup} ${styles["formGroup--radio"]}`}>
            <input
              type="radio"
              id="delivery"
              name="deliveryOption"
              value="delivery"
              checked={deliveryOption === "delivery"}
              onChange={handleOptionChange}
              required
            />
            <label htmlFor="delivery" className={styles["radio-label"]}>
              Delivery
            </label>
          </div>
        </div>
        <div
          className={`${styles.formGroup} ${styles["formGroup--location"]} ${
            deliveryOption === "pickup"
              ? styles["formGroup--location--expand"]
              : ""
          }`}
        >
          <label
            htmlFor="pickupLocation"
            className={`${styles["fadeIn-animation"]} ${
              deliveryOption === "pickup"
                ? styles["fadeIn-animation--active"]
                : ""
            }`}
          >
            Pick Up Location
          </label>
          <select
            id="pickupLocation"
            name="pickupLocation"
            className={`${styles["fadeIn-animation"]} ${
              deliveryOption === "pickup"
                ? styles["fadeIn-animation--active"]
                : ""
            }`}
            required
            ref={storeRef}
          >
            <option value="">Select a location</option>
            {STORES.map((store) => (
              <option value={store} key={store}>
                {store.charAt(0).toUpperCase() + store.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </form>
    );
  }
);

export const FormAddress = forwardRef(
  ({ onFinish, showAddressForm = false }, ref) => {
    const [errors, setErrors] = useState({});
    const addressSchema = object({
      street: string().required("Street is required"),
      city: string().required("City is required"),
      state: string().required("State is required"),
      zip: string().required("ZIP Code is required"),
      country: string().required("Country is required"),
    });

    const formRef = useRef(null);

    const streetRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const zipRef = useRef();
    const countryRef = useRef();

    const extractAndValidateData = async () => {
      const formData = {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
        country: countryRef.current.value,
      };
      const validationErrors = await validateForm(formData, addressSchema);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return { isValid: false, errors: validationErrors };
      } else {
        setErrors({});
        return { isValid: true, data: formData };
      }
    };

    useImperativeHandle(ref, () => ({
      extractAndValidateData,
      scrollIntoView: () => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      },
    }));

    async function onSubmit(e) {
      e.preventDefault();
      const addressData = await extractAndValidateData();
      if (!addressData.isValid) {
        setErrors(addressData.errors);
        return { isValid: false, errors: addressData.errors };
      }
      setErrors({});
      onFinish(addressData.data);
      // console.log("pass Address");
    }

    return (
      <form
        className={`${styles.form} ${styles["fadeIn-animation"]} ${
          showAddressForm ? styles["fadeIn-animation--active"] : ""
        }`}
        ref={formRef}
        onSubmit={onSubmit}
      >
        <h3 className={styles["form-heading"]}>Where? - Delivery Address</h3>
        <FormInput
          label="street"
          type="text"
          ref={streetRef}
          placeholder="123 Main St"
          errorMsg={errors.street}
          required
        />
        <FormInput
          label="city"
          type="text"
          ref={cityRef}
          placeholder="City"
          errorMsg={errors.city}
          required
        />
        <FormInput
          label="state"
          type="text"
          ref={stateRef}
          placeholder="State"
          errorMsg={errors.state}
          required
        />
        <FormInput
          label="zip"
          type="text"
          ref={zipRef}
          placeholder="ZIP Code"
          errorMsg={errors.zip}
          required
        />
        <FormInput
          label="country"
          type="text"
          ref={countryRef}
          placeholder="Country"
          className={styles.mb}
          errorMsg={errors.country}
          required
        />
        <ButtonSecondary type="submit" className={styles.submitButton}>
          Continue
        </ButtonSecondary>
      </form>
    );
  }
);

export const FormShipping = forwardRef(
  ({ onFinish, showShippingForm = false }, ref) => {
    const [errors, setErrors] = useState({});

    const formRef = useRef(null);

    const [shippingMethod, setShippingMethod] = useState(SHIPPING_METHODS[0]);
    const fullNameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);

    const shippingSchema = object({
      fullName: string().required("Fullname is required"),
      phone: number()
        .typeError("This field must be number")
        .required("Phone number is required"),
      shippingMethod: string()
        .required("Shipping method is required")
        .oneOf(SHIPPING_METHODS, "Invalid Shipping Method"),
    });

    const handleOptionChange = (e) => {
      setShippingMethod(e.target.value);
    };

    const extractAndValidateData = async () => {
      const formData = {
        fullName: fullNameRef.current.value,
        phone: phoneRef.current.value,
        shippingMethod: shippingMethod,
      };
      const validationErrors = await validateForm(formData, shippingSchema);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return { isValid: false, errors: validationErrors };
      } else {
        setErrors({});
        return { isValid: true, data: formData };
      }
    };

    useImperativeHandle(ref, () => ({
      extractAndValidateData,
      scrollIntoView: () => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      },
    }));

    async function onSubmit(e) {
      e.preventDefault();
      const formData = await extractAndValidateData();
      if (!formData.isValid) {
        setErrors(formData.errors);
        return { isValid: false, errors: formData.errors };
      }
      setErrors({});
      // console.log("pass shipping");
      onFinish(formData.data);
    }

    return (
      <form
        className={`${styles.form} ${styles["fadeIn-animation"]} ${
          showShippingForm ? styles["fadeIn-animation--active"] : ""
        }`}
        ref={formRef}
        onSubmit={onSubmit}
      >
        <h3 className={styles["form-heading"]}>Hold On - Shipping Details</h3>
        <FormInput
          label="fullname"
          type="string"
          ref={fullNameRef}
          errorMsg={errors.fullName}
          placeholder="Fullname"
          required
        />
        <FormInput
          label="phone"
          type="number"
          ref={phoneRef}
          errorMsg={errors.phone}
          placeholder="12345678"
          required
        />
        <FormInput
          label="email"
          type="email"
          ref={emailRef}
          errorMsg={errors.email}
          placeholder="example@email.com"
          className={styles.mb}
        />

        <div className={styles.radioGroup}>
          {SHIPPING_METHODS.map((method) => (
            <div
              className={`${styles.formGroup} ${styles["formGroup--radio"]}`}
              key={method}
            >
              <input
                type="radio"
                id={method}
                name="shippingMethod"
                value={method}
                checked={shippingMethod === method}
                onChange={handleOptionChange}
                required
              />
              <label htmlFor={method} className={styles["radio-label"]}>
                {method.charAt().toUpperCase() + method.slice(1)}
              </label>
            </div>
          ))}
          {/* <div className={`${styles.formGroup} ${styles["formGroup--radio"]}`}>
            <input
              type="radio"
              id="standard"
              name="shippingMethod"
              value="standard"
              checked={shippingMethod === "standard"}
              onChange={handleOptionChange}
              required
            />
            <label htmlFor="standard" className={styles["radio-label"]}>
              Standard
            </label>
          </div>
          <div className={`${styles.formGroup} ${styles["formGroup--radio"]}`}>
            <input
              type="radio"
              id="express"
              name="shippingMethod"
              value="express"
              checked={shippingMethod === "express"}
              onChange={handleOptionChange}
              required
            />
            <label htmlFor="express" className={styles["radio-label"]}>
              Express
            </label>
          </div> */}
        </div>
        <p>
          Express shipping will cost extra{" "}
          <strong>
            {getCurrency()}
            {HUNGRY_SHIP_FEE}
          </strong>
          .
        </p>
        <ButtonSecondary type="submit" className={styles.submitButton}>
          Continue
        </ButtonSecondary>
      </form>
    );
  }
);

export const FormBagSelect = forwardRef(({ onFinish }, ref) => {
  const [bagOption, setBagOption] = useState("");
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const bagSelectSchema = object({
    bagOption: string()
      .required("Bag option is required")
      .oneOf(BAG_OPTIONS, "Invalid Bag Option"),
  });

  const handleOptionChange = (e) => {
    setBagOption(e.target.value);
    onFinish({ bagOption: e.target.value });
  };

  const extractAndValidateData = () => {
    const formData = {
      bagOption: bagOption,
    };
    const validationErrors = validateForm(formData, bagSelectSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { isValid: false, errors: validationErrors };
    } else {
      setErrors({});
      return { isValid: true, data: formData };
    }
  };

  useImperativeHandle(ref, () => ({
    extractAndValidateData,
    scrollIntoView: () => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    },
  }));

  return (
    <Form
      className={` ${styles.form} ${styles["form-bagOption"]}`}
      ref={formRef}
    >
      <h3 className={styles["form-heading"]}>Decorate - Bag Options</h3>
      <div className={styles.radioGroup}>
        {BAG_OPTIONS.map((option) => (
          <div
            className={`${styles.formGroup} ${styles["formGroup--radio"]}`}
            key={option}
          >
            <input
              type="radio"
              id={`bagOption-${option}`}
              name="bagOption"
              value={option}
              checked={bagOption === option}
              onChange={handleOptionChange}
              required
            />
            <label
              htmlFor={`bagOption-${option}`}
              className={styles["radio-label"]}
            >
              {option.charAt().toUpperCase() + option.slice(1)}
            </label>
          </div>
        ))}
      </div>
    </Form>
  );
});

export const FormDetails = forwardRef(({ onFinish }, ref) => {
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState({});

  const formRef = useRef(null);

  const notesRef = useRef(null);
  const commentRef = useRef(null);

  const detailsSchema = object({
    rating: number()
      .required("Rating is required")
      .integer("Rating must be integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
  });

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const validateFormDetails = (formData) => {
    const formDetailsErrors = {};
    if (
      !Number.isInteger(formData.rating) ||
      formData.rating < 1 ||
      formData.rating > 5
    )
      formDetailsErrors.rating = "Invalid rating";
    return formDetailsErrors;
  };

  const extractAndValidateData = () => {
    const formData = {
      notes: notesRef.current.value,
      rating: rating,
      comment: commentRef.current.value,
    };
    const validationErrors = validateFormDetails(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return { isValid: false, errors: validationErrors };
    } else {
      setErrors({});
      return { isValid: true, data: formData };
    }
  };

  async function onSubmit(e) {
    e.preventDefault();
    const formData = extractAndValidateData();
    if (formData.isValid) onFinish(formData);
  }

  useImperativeHandle(ref, () => ({
    extractAndValidateData,
    scrollIntoView: () => {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    },
  }));

  return (
    <form className={`${styles.form} `} ref={formRef} onSubmit={onSubmit}>
      <h3 className={styles["form-heading"]}>Anything - Else?</h3>
      <FormInputTextarea
        label="Note For Your Order"
        id="notes"
        placeholder="State your specific instruction here."
        rows={4}
        ref={notesRef}
        className={styles["formGroup--notes"]}
      />
      <div
        className={`${styles.formGroup} ${styles["formGroup--notes"]} ${styles.formRating}`}
      >
        <label>Rate Us</label>
        <StarRating
          id="rating"
          rating={rating}
          onRatingChange={handleRatingChange}
        />
      </div>
      <FormInputTextarea
        label="Comments"
        id="comment"
        placeholder="State how do you feel with our service... Truthfully!"
        rows={4}
        ref={commentRef}
        className={`${styles["formGroup--notes"]} ${styles.mb}`}
      />

      <ButtonSecondary type="submit" className={styles.submitButton}>
        Continue
      </ButtonSecondary>
    </form>
  );
});

export function FormSubmit({ submitRef, onFinish, totalAmount, children }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onFinish();
  };

  return (
    <div className={` ${styles.form}`} ref={submitRef}>
      <h3 className={styles["form-heading"]}>Last Step - Double Confirm!</h3>
      <p>
        You are about to pay {getCurrency()}
        {totalAmount}. Double check your order details before payment.
      </p>
      <ButtonSecondary onClick={handleSubmit} className={styles.submitButton}>
        Check My Details
      </ButtonSecondary>
      {children}
    </div>
  );
}
