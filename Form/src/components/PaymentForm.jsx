import { useState } from "react"
import FormContainer from "./FormContainer"
import Checkbox from "./input/Checkbox"
import Input from "./input/Input"
import Radio from "./input/Radio"
import Select from "./input/Select"
import OrderSuccess from "./success order/OrderSuccess"
import SummaryInfo from "./success order/SummaryInfo"
import TemaContext from "./kontekst"
import { useContext } from "react"

function PaymentForm({ action }) {

    const [formData, setFormData] = useState({
        email: "",
        name: "",
        country: "Hrvatska",
        address: "",
        paymentOption: "Pouzeće"
    });
    const [validData, setValidData] = useState({
        emailIsValid: false,
        nameIsValid: false,
        addressIsValid: false,
        isChecked: false,
        orderSuccessful: false
    });
    const [note, setNote] = useState(false);

    const theme = useContext(TemaContext);
    const yellowLegend = (theme === "dark" ? "yellowLegend" : "");
    const yellowSpan = (theme === "dark" ? "yellowSpan" : "graySpan");
    const yellowBorder = (theme === "dark" ? "yellowBorder" : "");

    const emailValidation = (e) => {
        const newFormData = { ...formData };
        newFormData.email = e.target.value;
        setFormData(newFormData);

        const emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value);
        const newValidData = { ...validData };
        newValidData.emailIsValid = emailCheck;
        setValidData(newValidData);
    }

    const nameValidation = (e) => {
        const newFormData = { ...formData };
        newFormData.name = e.target.value;
        setFormData(newFormData);

        const nameCheck = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/.test(e.target.value);
        const newValidData = { ...validData };
        newValidData.nameIsValid = nameCheck;
        setValidData(newValidData);
    }

    const countrySelect = (e) => {
        const newFormData = { ...formData };
        newFormData.country = e.target.value;
        setFormData(newFormData);
    }

    const addressValidation = (e) => {
        const newFormData = { ...formData };
        newFormData.address = e.target.value;
        setFormData(newFormData);

        const addressCheck = /^[A-Za-z0-9\s,'čćžšđČĆŽŠĐ-]{10,}$/.test(e.target.value);
        const newValidData = { ...validData };
        newValidData.addressIsValid = addressCheck;
        setValidData(newValidData);
    }

    const handleOptionChange = (e) => {
        const newFormData = { ...formData };
        newFormData.paymentOption = e.target.value;
        setFormData(newFormData);
    }

    const handleCheckboxChange = (e) => {
        const newValidData = { ...validData };
        newValidData.isChecked = e.target.checked;
        setValidData(newValidData);
        setNote(false);
    }

    const handleOrder = (e) => {
        e.preventDefault();

        if (validData.emailIsValid && validData.nameIsValid
            && validData.addressIsValid && validData.isChecked) {
            const newValidData = { ...validData };
            newValidData.orderSuccessful = true;
            setValidData(newValidData);
        }

        if (!validData.isChecked) {
            alert("Niste prihvatili uvjete narudžbe !");
            setNote(true);
        }

        console.log(formData);
        console.log(validData);
    }

    function handleTheme(e) {
        e.preventDefault();
        action(e);
    }

    return (
        <>
            {!validData.orderSuccessful ?
                <form className={`paymentForm ${theme}`}>
                    <div className="header">
                        <h2> <span>Račun →</span> Plaćanje</h2>
                        <button className="toggleThemeBtn" onClick={handleTheme}>Light/Dark</button>
                    </div>

                    <FormContainer title="Kontakt" className="contactWrapper">
                        <Input
                            value={formData.email}
                            type="email"
                            id="email"
                            name="Email"
                            validMessage="Email je validan."
                            errorMessage="e.g ime@gmail.com"
                            placeholder="Email adresa..."
                            action={emailValidation}
                            valid={validData.emailIsValid}
                        />
                    </FormContainer>

                    <FormContainer title="Adresa" className="addressWrapper">
                        <div className="addressInputDiv">
                            <label htmlFor="name" className={yellowSpan}>Ime:</label>
                            <Input
                                value={formData.name}
                                type="text"
                                id="name"
                                name="Ime"
                                maxChar={15}
                                validMessage="Ime je validno."
                                errorMessage="e.g Ante ili Marko Petar"
                                action={nameValidation}
                                valid={validData.nameIsValid}
                            />
                        </div>

                        <div className="addressInputDiv">
                            <label htmlFor="country" className={yellowSpan}>Država:</label>
                            <Select value={formData.country} action={countrySelect} />
                        </div>

                        <div className="addressInputDiv">
                            <label htmlFor="address" className={yellowSpan}>Adresa:</label>
                            <Input
                                value={formData.address}
                                type="text"
                                id="address"
                                name="Adresa"
                                maxChar={15}
                                validMessage="Adresa je validna."
                                errorMessage="e.g Ruđera Boškovića 10, Split"
                                action={addressValidation}
                                valid={validData.addressIsValid}
                            />
                        </div>
                    </FormContainer>

                    <fieldset className={`fieldset ${yellowBorder}`}>
                        <legend className={`legend ${yellowLegend}`}>Način plaćanja:</legend>
                        <Radio
                            value="Pouzeće"
                            name="paymentOption"
                            action={handleOptionChange}
                            checked={formData.paymentOption === "Pouzeće"}
                        />
                        <Radio
                            value="Kartica"
                            name="paymentOption"
                            action={handleOptionChange}
                            checked={formData.paymentOption === "Kartica"}
                        />
                    </fieldset>

                    <Checkbox
                        checked={validData.isChecked}
                        action={handleCheckboxChange}
                        valid={note}
                    />

                    <button className="submitBtn" onClick={handleOrder}>Naruči</button>
                </form>
                :
                <OrderSuccess>
                    <SummaryInfo data={formData} />
                </OrderSuccess>
            }
        </>
    );
}

export default PaymentForm;