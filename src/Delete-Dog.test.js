import { render, screen, fireEvent } from "@testing-library/react";
import {MockedProvider} from "@apollo/client/testing"
import {DeleteButton ,DELETE_DOG_MUTATION} from "./Delete-Dog"

it("should render without error", () => {
    render(
        <MockedProvider mocks={[]}>
            <DeleteButton/>
        </MockedProvider>
    )
})

it("should render loading state initially", () => {
    const deleteDog = {name: "Buck", breed: "Poodle", id: 1};
    const mocks =[
        {
            request: {
                query: DELETE_DOG_MUTATION,
                variables: {name: "Buck"}
            },
            result: {data: {deleteDog}}
        }
    ]
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteButton/>
        </MockedProvider>   
    )
    const button = screen.getByRole("button", {name:"Click to Delete Buck"})
    fireEvent.click(button)
    expect(screen.getByText("Loading...")).toBeInTheDocument;    
})