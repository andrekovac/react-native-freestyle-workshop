## General project tips

- State-management-agnostic components + custom hooks with business logic

  ```tsx
  // custom hook hooks/usePhotos
  const usePhotos = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
      const fetchPhotos = async () => {
        const response = await fetch(
          'https://picsum.photos/v2/list?page=7&limit=10',
        );
        const data = await response.json();
        setPhotos(data);
      };
      fetchPhotos();
    }, []);

    return photos;
  };
  ```

- Specialisation via composition
