import { MockedProvider } from "@apollo/client/testing";
import { GET_DOG_QUERY } from "./Dog";
import { render, screen } from "@testing-library/react";
import { Dog } from "./Dog";

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: "Buck",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
  },
];

it("renders without error - loading state", () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog />
    </MockedProvider>
  );
});

it("renders without error - success state", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" },
    },
    result: {
      data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
    },
  };
  render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );
  await new Promise((resolve) => setTimeout(resolve, 15));
  expect(screen.getByText("Buck is a poodle")).toBeInTheDocument;
});

it("should show error UI", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variable: { name: "Buck" },
    },
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );
  await new Promise(resolve => setTimeout(resolve, 30));
  expect(screen.getByText("Error!")).toBeInTheDocument
});
