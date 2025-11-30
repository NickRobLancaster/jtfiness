<script setup>
// props
const props = defineProps({
  documentObjectId: {
    type: String,
    default: "",
  },

  // delcares the route to be called
  api_route: {
    type: String,
    default: `//`,
  },

  field_path: {
    type: String,
    default: "", // if nested field provide the mongo db fields path
  },

  existingFiles: {
    type: Array,
    default: () => [],
  },

  visualFiles: {
    type: Array,
    default: () => [],
  },

  modelValue: {
    type: Array,
    default: () => [],
  },
});

const api_store = useApiStore();

const emit = defineEmits(["update:modelValue"]);

const existingFiles = ref(props.existingFiles);

watch(
  () => existingFiles.value,
  (newValue) => {
    emit("update:modelValue", newValue);
  },
  { deep: true }
);

const visualFiles = ref([]);

//watch the files and emit the updated value
// watch(
//   () => existingFiles.value,
//   (newValue) => {
//     emit("update:modelValue", newValue);
//   },
//   { deep: true }
// );

//watch visualFiles and get access to the file object and use file reader to render it's content
// watch(
//   () => visualFiles.value,
//   (newValue) => {
//     if (Array.isArray(newValue) && newValue?.length > 0 && newValue[0]?.file) {
//       const file_data = new FormData();

//       const file_to_upload = newValue[0].file;

//       console.dir(file_to_upload);

//       file_data.append("file", file_to_upload);
//     } else {
//       console.warn("No valid file found in visualFiles");
//     }
//   },
//   { deep: true }
// );

const downloadFile = async (fileKey) => {
  if (import.meta.client) {
    try {
      const response = await $fetch(
        `/api/drug-tests/files/download?key=${encodeURIComponent(fileKey)}`
      );

      const downloadUrl = response?.url;
      if (!downloadUrl) {
        console.error("No download URL returned from the server");
        return;
      }

      // Option 1: Open in new tab
      window.open(downloadUrl, "_blank");

      // Option 2 (replace Option 1 if preferred): Download in same tab
      // window.location.href = downloadUrl;
    } catch (error) {
      console.error("Error downloading file:", fileKey, error);
    }
  }
};

const delete_file = async (delete_obj) => {
  const id = props.documentObjectId;
  //axios delete request to delete the file
  console.log(delete_obj);

  //remove the file from the existingFiles array
  existingFiles.value = existingFiles.value.filter(
    (file) => file._id !== delete_obj._id
  );

  try {
    const data = await $fetch(`/api/drug-tests/files/${id}`, {
      method: "DELETE",
      body: JSON.stringify(delete_obj),
    });

    existingFiles.value = data.updated_files_list;

    if (data.status === "success") {
      api_store.create_toast({
        title: "Success",
        message: "File Deleted",
        color: "bg-emerald-500",
      });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

const uploadFile = async () => {
  const id = props.documentObjectId;

  if (visualFiles.value.length > 0 && visualFiles.value[0]?.file) {
    const formData = new FormData();
    const new_name = visualFiles.value[0].name;
    // Append the file with key "file"
    formData.append("file", visualFiles.value[0].file);
    // Append the custom name with the key "newName"
    formData.append(new_name, new_name);

    try {
      const response = await $fetch(`/api/drug-tests/files/${id}`, {
        method: "PATCH",
        body: formData,
      });

      existingFiles.value = response.updated_files_list;

      console.log("File uploaded successfully:", response);

      if (response.status === "success") {
        api_store.create_toast({
          title: "Success",
          message: "File Uploaded",
          color: "bg-emerald-500",
        });

        // Clear the visualFiles array after successful upload
        visualFiles.value = [];
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    console.warn("No valid file found in visualFiles to upload.");
  }
};
const uploadFileCS = async () => {
  const id = props.documentObjectId;

  if (visualFiles.value.length > 0 && visualFiles.value[0]?.file) {
    const formData = new FormData();

    const new_name = visualFiles.value[0].name;
    // Append the file with key "file"
    formData.append("file", visualFiles.value[0].file);
    // Append the custom name with the key "newName"
    formData.append("new_name", new_name);

    formData.append("id", id);

    // convert the formData object to a regular object
    const formDataObject = {
      id: id,
      new_name: new_name,
      file_type: visualFiles.value[0].file.type,
      original_file_name: visualFiles.value[0].file.name,
    };

    // log the formDataObject
    console.log("FormData object OBJ:", formDataObject);

    //log the formData object
    console.log("FormData object:", formData);

    try {
      const response = await $fetch(`/api/drug-tests/files-cs/upload`, {
        method: "POST",
        body: formDataObject,
      });

      const { url, key, status, bucket } = response;

      console.log("S3 Bucket Presigned URL Generation Response: ", status);

      const file_ref_obj = {
        name: new_name,
        file_name: new_name ? new_name : visualFiles.value[0].file.name,
        key: key,
        url: url,
        bucket: bucket,
        type: visualFiles.value[0].file.type,
        size: visualFiles.value[0].file.size,
        upload_status: status,
      };

      // send a PUT request to the url returned
      const s3_url_put = await $fetch(url, {
        method: "PUT",
        body: visualFiles.value[0].file,
        headers: {
          "Content-Type": visualFiles.value[0].file.type,
        },
      });

      console.log("S3 PUT RESPONSE: ", s3_url_put);

      // store the reference vvv

      const create_file_ref = await $fetch(`/api/drug-tests/files-cs/${id}`, {
        method: "PATCH",
        body: { file_ref_obj },
      });

      console.log("FILE REF CREATED?: ", create_file_ref);

      existingFiles.value = create_file_ref.updated_files_list;

      console.log("File uploaded successfully:", response);

      if (create_file_ref.status === "success") {
        api_store.create_toast({
          title: "Success",
          message: "File Uploaded",
          color: "bg-emerald-500",
        });

        // Clear the visualFiles array after successful upload
        visualFiles.value = [];
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } else {
    console.warn("No valid file found in visualFiles to upload.");
  }
};

const removeFile = (delete_obj) => {
  const prompt = confirm("Are you sure you want to delete this file?");

  if (prompt) {
    delete_file(delete_obj);
  }
};
</script>

<template>
  <div
    class="w-full flex flex-col gap-5 p-5 border border-base-300 rounded-3xl"
  >
    <FormKit
      outer-class="flex flex-col gap-5"
      wrapper-class="flex flex-col gap-5"
      inner-class="flex flex-col gap-5"
      noFiles-class="hidden"
      prefix-class="bg-green-500"
      fileItemIcon-class=""
      input-class="bg-blue-500 p-5 text-base-content rounded-full border-4 border-base-300
 border-base-300
"
      noFilesIcon-class="text-base-content"
      fileList-class="flex flex-col gap-2"
      fileItem-class="flex flex-col gap-5"
      fileRemove-class="btn btn-sm btn-error text-base-content"
      fileName-class="hidden bg-gray-50 text-base-content p-2 text-center rounded px-5"
      type="file"
      label="Raw Data CSV"
      accept=".csv,.xls,.xlsx,.pdf,.doc,.docx,.txt,.json,.png,.jpg,.jpeg,.gif,.mp3,.wav,.m4a,.mp4,.mov,.avi,.webm"
      v-model="visualFiles"
    />

    <!-- Render Name only if visual_files[0] exists -->
    <FormKit
      v-if="visualFiles.length > 0"
      label="Rename File Before Uploading"
      message-class="text-base-content"
      type="text"
      name="Name"
      validation="required"
      wrapper-class="$reset w-full"
      :input-class="`input input-bordered w-full bg-gray-50 text-base-content`"
      v-model="visualFiles[0].name"
    />

    <!-- {{ visualFiles }} -->

    <button
      v-if="
        visualFiles.length > 0 && visualFiles[0]?.file && visualFiles[0]?.name
      "
      type="button"
      class="btn btn-primary text-base-content"
      @click="uploadFileCS"
    >
      Upload
    </button>
    <br />

    <div class="overflow-x-auto">
      <div v-if="existingFiles?.length === 0">
        <p
          class="text-center text-base-content p-5 border border-base-300 rounded-3xl"
        >
          No files uploaded yet.
        </p>
      </div>

      <table v-else class="table table-xs table-fixed">
        <thead>
          <tr>
            <th class="w-52">ID</th>
            <th class="w-52">Name</th>
            <!-- <th>File Name</th> -->
            <th>Type</th>
            <!-- <th>URL</th> -->
            <!-- <th>Path</th> -->
            <!-- <th>Key</th> -->
            <!-- <th>Size</th> -->
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in existingFiles" :key="file._id">
            <td>{{ file._id }}</td>
            <th>
              <!-- <FormKit
                message-class="text-base-content"
                type="text"
                name="Name"
                validation="required"
                wrapper-class="$reset w-full"
                :input-class="`input input-bordered w-full`"
                v-model="file.name"
              /> -->

              {{ file.name }}
            </th>
            <!-- <td>{{ file.file_name }}</td> -->
            <td>{{ file.type }}</td>
            <!-- <td>{{ file.url }}</td> -->
            <!-- <td>{{ file.path }}</td> -->
            <!-- <td>{{ file.key }}</td> -->
            <!-- <td>{{ file.size }}</td> -->
            <td class="flex flex-row gap-2 sticky right-0 justify-center">
              <button
                type="button"
                @click="downloadFile(file.key)"
                class="bg-blue-500 text-base-content btn btn-square rounded hover:bg-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                  <path
                    fill="currentColor"
                    d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
                  />
                </svg>
              </button>
              <button
                type="button"
                @click="removeFile({ upload_id: file._id, key: file.key })"
                class="bg-red-500 text-base-content btn btn-square rounded hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                >
                  <!-- Icon from All by undefined - undefined -->
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style></style>
