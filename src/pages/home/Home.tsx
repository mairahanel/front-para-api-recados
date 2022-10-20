import { Box,  Button,  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  Fab,  Grid,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { Navbar } from "../../components/Navbar/Navbar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import axios from "axios";

interface Task {
    description: string,
    detail: string,
    id: string
}

interface User {
    email: string,
    password: string,
    vPassword: string,
    id: string,
    tasks: Task[],
    archivedTasks: Task[]
}


export const Home: React.FC = () => {


    const api = axios.create({
        baseURL: 'http://localhost:3000'
    });

    const[ lista, setLista ] = useState<Task[]>([]);
    const[ descricao, setDescricao] = useState<string>("");
    const[ detalhamento, setDetalhamento] = useState<string>("");


    //MODAIS
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const openModalAdd = () => {
        setOpenAdd(true);
    };

    const closeModalAdd = () => {
        setOpenAdd(false);
    };

    const openModalEdit = () => {
        setOpenEdit(true);
    };

    const closeModalEdit = () => {
        setOpenEdit(false);
    };

    async function createTask() {
        try {
            const task = {
                description: descricao,
                detail: detalhamento
            };

            const userId = localStorage.getItem('user-id');

            const result: Task[] = await api.post(`/users/${userId}/tasks`, task);

            listaRecados();

            console.log(result);

        } catch (error: any) {
            console.log(error);
            console.log("Erro ao criar task")
        }
    };

    async function listaRecados() {
        try {
            const userId = localStorage.getItem('user-id');

            const result: Task[] = await api.get(`/users/${userId}/tasks`);

            setLista(result);

            console.log("Deu bom")
            console.log(result)

        } catch (error: any) {

            console.log("Deu ruim")
            console.log(error)
        }
    };

    async function isLogged() {

        const id = localStorage.getItem("user-id");

        if(!id) {
            alert("Você não está logado")
            window.location.href = "/login";
        };
    };

    isLogged();


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
                                    <TableRow key={lista.id} sx={{ backgroundColor: "#D3D3D3" }}>
                                    <TableCell component="th" scope="row">
                                        {lista.description}
                                    </TableCell>
                                    <TableCell align="left">{lista.detail}</TableCell>
                                    <TableCell align="center">
                                        <Button size='small' color='success' onClick={openModalEdit}> <EditIcon /></Button>
                                        <Button size='small' color='error'> <DeleteIcon /> </Button>
                                    </TableCell>
                                    </TableRow>

                                    )
                                    })}

                        </TableBody>
                    </Table>
                </TableContainer>
                </Grid>
                <Grid item sx={{ width: "80px", padding: "0", display: "flex", justifyContent: "center" }}>
                    <Fab color="primary" aria-label="add" onClick={openModalAdd}>
                        <AddIcon />
                    </Fab>
                </Grid>

                {/* MODAL DE ADICIONAR TAREFA */}
                <Dialog open={openAdd} onClose={closeModalAdd}>
                    <DialogTitle>Adicionar tarefa</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Para adicionar uma tarefa, preencha os campos corretamente.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descrição"
                        fullWidth
                        variant="outlined"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Detalhamento"
                        fullWidth
                        variant="outlined"
                        value={detalhamento}
                        onChange={(e) => setDetalhamento(e.target.value)}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={closeModalAdd}>Cancelar</Button>
                    <Button variant="contained" onClick={() => createTask()}>Salvar</Button>
                    </DialogActions>
                </Dialog>

                {/* MODAL DE EDITAR TAREFA */}
                <Dialog open={openEdit} onClose={closeModalEdit}>
                    <DialogTitle>Editar tarefa</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Para editar a tarefa, preencha os campos corretamente.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Descrição"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Detalhamento"
                        fullWidth
                        variant="outlined"
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={closeModalEdit}>Cancelar</Button>
                    <Button variant="contained" onClick={closeModalEdit}>Salvar</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
            </Box>
    )
}