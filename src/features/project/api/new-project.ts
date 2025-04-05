import { project } from "@/features/auth/types";
import { db } from "../../../config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";

