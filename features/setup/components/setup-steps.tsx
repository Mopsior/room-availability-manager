import { Steps, StepsElement, StepsLastElement } from "@/components/steps"

export const SetupSteps = ({ checked, selected }: { checked: Array<boolean>, selected: Array<boolean> }) => {
    return (
        <Steps>
            <StepsElement number={1} selected={selected[0]} checked={checked[0]}>
                Firebase & Firestore configuration
            </StepsElement>
            <StepsElement number={2} selected={selected[1]} checked={checked[1]}>
                What you need to do
            </StepsElement>
            <StepsLastElement number={3} selected={selected[2]} checked={checked[2]}>
                Creating Admin Account
            </StepsLastElement>
        </Steps>
    )
}