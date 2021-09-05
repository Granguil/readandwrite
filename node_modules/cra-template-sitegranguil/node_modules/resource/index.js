export const resource = {
  lang: "Fra",
  list: {},
  load: (data) => {
    resource.list = data;
    console.log(resource.list);
  },
};

export default resource;
