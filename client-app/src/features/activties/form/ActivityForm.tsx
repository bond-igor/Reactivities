import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Segment,
  FormInput,
  Form,
  FormTextArea,
  Button,
} from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import {v4 as uuid} from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initForm);

  const handleSubmit = () => {
    if(activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        ></FormInput>
        <FormTextArea
          onChange={handleInputChange}
          rows={2}
          name="description"
          placeholder="Descriptions"
          value={activity.description}
        ></FormTextArea>
        <FormInput
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        ></FormInput>
        <Button
        
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};
