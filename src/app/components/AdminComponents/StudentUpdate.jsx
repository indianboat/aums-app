"use client";

import { useFormik } from 'formik'
import React, { useState } from 'react'
import Input from "@/app/components/InputComponent/Input";
import Button from '../ButtonComponent/Button';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../SpinnerComponent/Spinner';
import Select from '../selectComponent/Select';
import Image from 'next/image';

const StudentUpdate = ({ student }) => {

  let dd = new Date(student.DOB).getDate();
  if (dd <= 9) { dd = `0${dd}` }

  let mm = new Date(student.DOB).getMonth() + 1;
  if (mm <= 9) { mm = `0${mm}` }

  let yyyy = new Date(student.DOB).getFullYear();

  const [readOnly, setReadOnly] = useState(true);
  const [loading, setLoading] = useState(false);

  const [imgFile, setImgFile] = useState(null);
  const [imgFileName, setImgFileName] = useState('');

  const handleFileChange = (event) => {
    setImgFile(event.target.files[0]);
    setImgFileName(event.target.files[0].name);
  };

  const formik = useFormik({
    initialValues: {
      fname: student.fname,
      lname: student.lname,
      email: student.email,
      mobile: student.mobile,
      course: student.course,
      enrol_num: student.enrol_num,
      batch: student.batch,
      gender: student.gender,
      DOB: `${yyyy}-${mm}-${dd}`,
      religion: student.religion,
      blood_group: student.blood_group,
      semester: student.semester,
      nationality: student.nationality,
      country: student.country,
      adhar_card: student.adhar_card,
      pancard: student.pancard,
      address: student.address,
      img: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1694253051/CldUploadWidget-unsigned/znwksjo8mx1g3mjgldmw.jpg",
      sign: "https://res.cloudinary.com/colbycloud-next-cloudinary/image/upload/v1694253051/CldUploadWidget-unsigned/znwksjo8mx1g3mjgldmw.jpg",
      role: "student",
      isActive: student.isActive == true ? "Active" : "Inactive" 
    },
    onSubmit
  });

  const handleGender = (selectedOption) => {
    formik.values.gender = selectedOption;
  }

  const handleReligion = (selectedOption) => {
    formik.values.religion = selectedOption;
  }
  const handleBloodGroup = (selectedOption) => {
    formik.values.blood_group = selectedOption;
  }
  const handleStatus = (selectedOption) => {
    formik.values.isActive = selectedOption === "Active" ? true : false;
  }

  async function onSubmit(values) {
    setLoading(true);
    const res = await fetch(`/api/students/${student._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (res.status === 201 && res.ok) {
      setLoading(false);
      toast.success("Student Updated !");
    }
    else if (!res.ok && res.status === 200) {
      setLoading(false);
      toast.error("Student Not Found !");
    }

    else {
      toast.error(res.error);
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <form method="post" onSubmit={formik.handleSubmit}>
        <div className="border grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-8">
          <div className="w-full border">
            <Input label="First Name" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="fname" name="fname" {...formik.getFieldProps("fname")} />
          </div>
          <div className="w-full border">
            <Input label="Last Name" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="lname" name="lname" {...formik.getFieldProps("lname")} />
          </div>
          <div className="w-full border">
            <Input label="Email Id" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="email" name="email" {...formik.getFieldProps("email")} />
          </div>
          <div className="w-full border">
            <Input label="Mobile" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="mobile" name="mobile" {...formik.getFieldProps("mobile")} />
          </div>

          <div className="w-full border">
            <Input label="Course" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="course" name="course" {...formik.getFieldProps("course")} />
          </div>
          <div className="w-full border">
            <Input label="Enrolment Number" type='text' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="enrol_num" name="enrol_num" {...formik.getFieldProps("enrol_num")} />
          </div>
          <div className="w-full border">
            <Input label="Batch" type='month' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="batch" name="batch" {...formik.getFieldProps("batch")} />
          </div>
          <div className="w-full border">
            <Input label="Date of Birth" type='date' className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} id="DOB" name="DOB" {...formik.getFieldProps("DOB")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Gender</label>
            <Select className="w-full border" options={["Male", "Female", "Transgender", "Other"]} value={formik.values.gender} readOnly={readOnly} onSelect={handleGender} id="gender" name="gender" placeholder="Select your gender" {...formik.getFieldProps("gender")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Religion</label>
            <Select className="w-full border" options={["Hinduism", "Buddhism", "Islam", "Sikhism", "Jainism"]} value={formik.values.religion} readOnly={readOnly} onSelect={handleReligion} placeholder="Select your religion" id="religion" name="religion" {...formik.getFieldProps("religion")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Blood Group</label>
            <Select className="w-full border" options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]} value={formik.values.blood_group} readOnly={readOnly} onSelect={handleBloodGroup} placeholder="Select your blood group" id="blood_group" name="blood_group" {...formik.getFieldProps("blood_group")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Nationality</label>
            <Input type="text" className="w-full border" onClick={() => setReadOnly(false)} readOnly={readOnly} placeholder="Select your nationality" id="nationality" name="nationality" {...formik.getFieldProps("nationality")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Counrty</label>
            <Input type="text" className="w-full border capitalize" onClick={() => setReadOnly(false)} readOnly={readOnly} placeholder="eg: India" id="country" name="country" {...formik.getFieldProps("country")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Aadhar Card</label>
            <Input type="tel" className="w-full border" maxLength={12} onClick={() => setReadOnly(false)} readOnly={readOnly} placeholder="enter your adhar card" id="adhar_card" name="adhar_card" {...formik.getFieldProps("adhar_card")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Pan Card</label>
            <Input type="text" className="w-full uppercase border" maxLength={10} onClick={() => setReadOnly(false)} readOnly={readOnly} placeholder="enter your pan card" id="pancard" name="pancard" {...formik.getFieldProps("pancard")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Student Status</label>
            <Select className="w-full h-fit border" options={["Active", "Inactive"]} value={formik.values.isActive} readOnly={readOnly} onSelect={handleStatus} placeholder="Change status" id="isActive" name="isActive" {...formik.getFieldProps("isActive")} />
          </div>
          <div className="w-full flex flex-col gap-y-1 border">
            <label>Address</label>
            <textarea rows={4} type="text" className="input w-full border bg-[#eaeef0] dark:bg-[#141417] capitalize" onClick={() => setReadOnly(false)} readOnly={readOnly} placeholder="enter your full address" id="address" name="address" {...formik.getFieldProps("address")} />
          </div>
          <div className="flex flex-row gap-x-3">
          {
            formik.values.img === "" ? null :
              <div className="w-full flex flex-col gap-y-1 border">
                <label>Student Photo</label>
                <Image src={formik.values.img} width={100} height={100} alt="student-photo-image" className="input w-24 h-24 border bg-[#eaeef0] dark:bg-[#141417]" id="student-img" />
              </div>
          }
          {
            formik.values.sign === "" ? null :
              <div className="w-full flex flex-col gap-y-1 border">
                <label>Student Sign</label>
                <Image src={formik.values.sign} width={100} height={100} alt="student-sign-pic" className="input w-24 h-24 border bg-[#eaeef0] dark:bg-[#141417]" id="student-sign" />
              </div>
          }
          </div>

        </div>
        <div className="flex flex-row gap-x-4 mt-4">
          <Button className="border-2 text-primary dark:text-white border-blue-600 " type="reset" onClick={() => formik.resetForm()}>Reset</Button>
          <Button className="bg-primary" type="submit">{loading ? <Spinner /> : "Update"}</Button>
        </div>
      </form>
    </>
  )
}

export default StudentUpdate