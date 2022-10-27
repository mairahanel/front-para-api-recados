import { Box,  Button, Grid,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { Navbar } from "../../components/Navbar/Navbar";
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Task {
    _description: string,
    _detail: string,
    _id: string
};

export const Archived: React.FC = () => {

    const api = axios.create({
        baseURL: 'http://localhost:3000'
    });

    const [ lista, setLista ] = useState<Task[]>([]);


    async function isLogged() {

        const id = localStorage.getItem("user-id");

        if(!id) {
            alert("Você não está logado")
            window.location.href = "/login";
        };
    };

    async function Mostrar() {
        try {
            useEffect(() => {
                const getListaDeArquivados = async () => {
        
                    const userId = localStorage.getItem('user-id');
        
                    const  { data }  : AxiosResponse <Task[]> = await (await api.get(`/users/${userId}/tasks/archived`)).data;
        
                    setLista(data);
        
                };
        
                getListaDeArquivados()
              }, [lista]);

        } catch (error) {
            console.log(error)
            console.log("Erro na requisição")
        }
    };

    async function unfile(id: string) {
        try {
            const userId = localStorage.getItem('user-id');

            const result: Task[] = await api.post(`/users/${userId}/tasks/${id}/archived`);

            console.log(result);

            alert("Tarefa desarquivada com sucesso!");

        } catch (error: any) {
            console.log(error)
            console.log("Erro ao desarquivar task")
        }
    };

    isLogged();

    Mostrar();


    return(
            <Box>
                <Navbar />
            <Grid container sx={{ marginTop: "200px", display: "flex", justifyContent: "center" }}>
                <Grid item>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 970 }} aria-label="customized table">
                        <TableHead>
                        <TableRow sx={{ backgroundColor: "#808080" }}>
                            <TableCell >Descrição</TableCell>
                            <TableCell align="left">Detalhamento</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>

                            {lista.map((lista) => {
                                return(
                                    <TableRow key={lista._id} sx={{ backgroundColor: "#D3D3D3" }}>
                                    <TableCell component="th" scope="row">
                                        {lista._description}
                                    </TableCell>
                                    <TableCell align="left">{lista._detail}</TableCell>
                                    <TableCell align="center">
                                        <Button size='small' color='success' onClick={() => unfile(lista._id)}> <UnarchiveIcon /> </Button>
                                    </TableCell>
                                    </TableRow>
                                    )
                                    })}

                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
            </Grid>
            </Box>
    )
}