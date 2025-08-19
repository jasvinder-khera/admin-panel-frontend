import { useDispatch } from "react-redux";
import { setChartData, setChartType } from "../../features/charts/chartSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ChartForm() {
  const dispatch = useDispatch();

  // Validation Schema
  const validationSchema = Yup.object({
    labels: Yup.string()
      .required("Labels are required")
      .test(
        "is-valid-labels",
        "At least two labels required (comma-separated)",
        (value) => value.split(",").filter((item) => item.trim()).length >= 2
      ),
    legend: Yup.string()
      .required("Legend is required in Chart")
      .min(3, "Minimum characters for Legend should be 3"),
    data: Yup.string()
      .required("Data values are required")
      .test(
        "is-valid-data",
        "At least two numeric values required (comma-separated)",
        (value) => {
          const numbers = value.split(",").map((num) => num.trim());
          return (
            numbers.length >= 2 &&
            numbers.every((num) => !isNaN(num) && num !== "")
          );
        }
      ),
    chartType: Yup.string()
      .oneOf(["bar", "pie"], "Invalid chart type")
      .required("Chart type is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const labelsArray = values.labels.split(",").map((item) => item.trim());
    let legend = values.legend;
    const dataArray = values.data
      .split(",")
      .map((num) => parseInt(num.trim(), 10));

    dispatch(
      setChartData({
        labels: labelsArray,
        datasets: [
          {
            label: legend,
            data: dataArray,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
            ],
          },
        ],
      })
    );
    dispatch(setChartType(values.chartType));
    setSubmitting(false);
  };

  return (
    <div className="chart-form">
      <Formik
        initialValues={{
          labels: "",
          legend: "",
          data: "",
          chartType: "bar",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field
                name="labels"
                type="text"
                placeholder="Enter Labels (comma-separated)"
                className="my-3 form-control"
              />
              <ErrorMessage
                component="div"
                className="text-danger py-3"
                name="labels"
              />
              <Field
                name="legend"
                type="text"
                placeholder="Enter Legend for Chart"
                className="my-3 form-control"
              />
              <ErrorMessage
                component="div"
                className="text-danger py-3"
                name="legend"
              />
            </div>
            <div>
              <Field
                name="data"
                type="text"
                placeholder="Enter data (comma-separated)"
                className="my-3 form-control"
              />
              <ErrorMessage
                component="div"
                className="text-danger py-3"
                name="data"
              />
            </div>
            <div>
              <Field name="chartType" as="select" className="form-control">
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
              </Field>
              <ErrorMessage
                component="div"
                name="chartType"
                className="text-danger py-3"
              />
            </div>
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="mt-4 btn btn-primary"
              >
                {isSubmitting ? "Generating..." : "Generate Chart"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
