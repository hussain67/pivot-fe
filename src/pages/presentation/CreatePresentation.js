import React, { useState, useEffect } from "react";
import Page from "../../components/Page";
import PresentationList from "../../components/PresentationList";
import { createPresentation, getAllPresentations, deletePresentationById, editPresentationById } from "../../utils/api/presentationApi";

import { useNavigate } from "react-router-dom";
import { addItemToLocalStorage } from "../../utils/localstorage";

const CreatePresentation = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [presentations, setPresentations] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [presentationName, setPresentationName] = useState(null);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isEdit) {
      createPresentation(input).then(presentation => {
        if (presentation) {
          addItemToLocalStorage("presentationName", presentation.title);
          setPresentationName(presentation);
          setPresentations([...presentations, presentation]);
        }
      });
    } else if (isEdit) {
      //console.log("edit");
      editPresentation(idEdit, input);
      setIsEdit(false);
      // editPresentation();
    }
    setInput("");
  };
  const showSlides = id => {
    navigate(`/slides/${id}`);
  };
  const editPresentation = (id, title) => {
    return editPresentationById(id, title).then(presentation => {
      if (presentation) {
        setPresentations(
          presentations.map(presentation => {
            if (presentation._id === id) {
              presentation.title = title;
            }
            return presentation;
          })
        );
      }
    });
  };

  const setEdit = (id, title) => {
    setIsEdit(true);
    setInput(title);
    setIdEdit(id);
  };

  const deletePresentation = id => {
    deletePresentationById(id).then(presentation => {
      if (presentation) {
        setPresentations(
          presentations.filter(presentation => {
            return presentation._id != id;
          })
        );
      }
    });
  };
  useEffect(() => {
    getAllPresentations().then(presentations => {
      if (presentations) {
        setPresentations(presentations);
      }
    });
  }, []);
  //console.log(presentations);
  /*
  useEffect(() => {
    if (presentation) {
      setTimeout(() => {
        navigate(`/create-slide/${presentation.id}`);
      }, 1000);
    }
  }, [presentation, navigate]);

  */
  return (
    <Page title={"Create-presentation"}>
      <div className="presentation-create">
        <form className="presentation-create__form" onSubmit={handleSubmit}>
          <div className="presentation-title">
            <input type="text" name="presentation" className="" onChange={handleChange} value={input} placeholder="Presentation title" />
          </div>
          <button type="submit" className="btn-create presentation-btn">
            {isEdit ? "Edit" : "Create"}
          </button>
        </form>

        <div>{presentations.length > 0 && <PresentationList presentations={presentations} deletePresentation={deletePresentation} showSlides={showSlides} setEdit={setEdit} />}</div>
      </div>
    </Page>
  );
};

export default CreatePresentation;
